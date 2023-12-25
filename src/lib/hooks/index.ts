import { PUBLIC_DATABASE_ID, PUBLIC_MESSAGES_ID } from "$env/static/public"
import { appwrite } from "$lib/appwrite"

export const getMessages = async () => {
    const messages = await appwrite.databases.listDocuments(PUBLIC_DATABASE_ID, PUBLIC_MESSAGES_ID)
    return messages
}

export const createMessage = async (text: string) => {

    const payload = {
        text
    }
    const messageCreated = await appwrite.databases.createDocument(
        PUBLIC_DATABASE_ID, 
        PUBLIC_MESSAGES_ID,
        appwrite.ID.unique(),
        payload
    );
    
    return messageCreated
}

