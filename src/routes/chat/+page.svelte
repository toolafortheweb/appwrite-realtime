<script lang="ts">
	import { page } from '$app/stores';
	import { createMessage, deleteMessage } from '$lib/hooks';
	import { writable, type Writable } from 'svelte/store';
	import type { Models } from 'appwrite';
	import { onMount, onDestroy } from 'svelte';
	import { appwrite } from '$lib/appwrite';
	import { PUBLIC_DATABASE_ID, PUBLIC_MESSAGES_ID } from '$env/static/public';

	let message: Writable<string> = writable();
	let documents: Writable<Models.Document[]> = writable($page.data.messages.documents);
	let unsubscribe: any;

	const handleSubmit = async () => {
		const newMessage = await createMessage($message);
		$message = '';
		console.log('created');
	};

	const handleDelete = async (messageId: string) => {
		await deleteMessage(messageId);
		console.log('deleted');
	};

	onMount(() => {
		unsubscribe = appwrite.client.subscribe(
			`databases.${PUBLIC_DATABASE_ID}.collections.${PUBLIC_MESSAGES_ID}.documents`,
			(response: any) => {
				if (response.events.includes('databases.*.collections.*.documents.*.create')) {
					documents.update((documentsList) => [...documentsList, response.payload]);
				} else if ('databases.*.collections.*.documents.*.delete') {
					documents.update((documentsList) =>
						documentsList.filter((d) => d.$id !== response.payload.$id)
					);
				}
			}
		);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<h1>CHAT</h1>
<ul>
	{#each $documents as document}
		<li class="flex">
			<div class="flex flex-col">
				<p>{document.$createdAt}</p>
				<p>{document.text}</p>
			</div>
			<button on:click={() => handleDelete(document.$id)}>X</button>
		</li>
	{/each}
</ul>

<form on:submit|preventDefault={handleSubmit}>
	<textarea bind:value={$message} maxlength={512} placeholder="Enter your message" required
	></textarea>
	<button type="submit">Send</button>
</form>
