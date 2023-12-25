<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	console.log('data', data);
	$: loggedIn = !!data.account;

	async function logout() {
		await appwrite.account.deleteSession('current');
		// invalidateAll will execute all `load` functions again.
		// In our case, this means we'll fetch the account data again.
		await invalidateAll();
	}
</script>

{#if loggedIn}
	<p>Hello {data.account?.name}!</p>
	<a href="/chat">Go to Chat</a>
	<button on:click={logout}>Logout</button>
{:else}
	<a href="/login">Login</a>
	<a href="/signup">Signup</a>
{/if}
