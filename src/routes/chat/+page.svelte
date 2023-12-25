<script lang="ts">
	import type { PageData } from "../$types";
    import { page } from '$app/stores'
	import { createMessage, deleteMessage } from "$lib/hooks";
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

    const handleDelete = async (messageId: string) => {
        await deleteMessage(messageId)
        console.log("deleted")
        documents.update(documentsList => {
            documentsList.filter(d => d.$id !== messageId)
            return documentsList
        })
        console.log("filtered")
    }
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
    <textarea bind:value={$message} maxlength={512} placeholder="Enter your message" required></textarea>
    <button type="submit">Send</button>
</form>
