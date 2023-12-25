<script>
	import { PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID_MESSAGES } from "$env/static/public";
	import { appwrite } from "$lib/appwrite";

    const getMessages = async () => {
        const messages = await appwrite.databases.listDocuments(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID_MESSAGES)
        return messages
    }

    console.log("messages", getMessages())
</script>

chat
