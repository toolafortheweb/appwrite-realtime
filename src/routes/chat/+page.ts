import { PUBLIC_DATABASE_ID, PUBLIC_MESSAGES_ID } from "$env/static/public";
import { appwrite } from "$lib/appwrite";
import { getMessages } from "$lib/hooks";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const messages = await getMessages()
    return {
        messages 
    }
};