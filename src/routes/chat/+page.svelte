<script lang="ts">
	import type { PageData } from "../$types";
    import { page } from '$app/stores'
	import { createMessage } from "$lib/hooks";
	import { writable, type Writable } from "svelte/store";
	import type { Models } from "appwrite";

    let message: Writable<string> = writable()
    let documents: Writable<Models.Document[]> = writable()

    $: documents.set($page.data.messages.documents)
        

    const handleSubmit = async () => {
        const newMessage = await createMessage($message)
        $message = ""
        documents.update(documentsList => {
            documentsList.push(newMessage)
            return documentsList
        })
    }
</script>

<h1>CHAT</h1>
<ul>
    {#each $documents as document}
        <li><p>{document.$createdAt}</p>
            <p>{document.text}</p>
        </li>
    {/each}
</ul>

<form on:submit|preventDefault={handleSubmit}>
    <textarea bind:value={$message} maxlength={512} placeholder="Enter your message" required></textarea>
    <button type="submit">Send</button>
</form>
