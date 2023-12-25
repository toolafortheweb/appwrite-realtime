import { PUBLIC_DATABASE_ID, PUBLIC_MESSAGES_ID } from "$env/static/public";
import { appwrite } from "$lib/appwrite";

export const getMessages = async () => {
  const messages = await appwrite.databases.listDocuments(
    PUBLIC_DATABASE_ID,
    PUBLIC_MESSAGES_ID,
    [appwrite.Query.orderAsc("$createdAt"), appwrite.Query.limit(10)]
  );
  return messages;
};

export const createMessage = async (text: string) => {
  const payload = {
    text,
  };
  const messageCreated = await appwrite.databases.createDocument(
    PUBLIC_DATABASE_ID,
    PUBLIC_MESSAGES_ID,
    appwrite.ID.unique(),
    payload
  );

  return messageCreated;
};

export const deleteMessage = async (messageId: string) => {
  await appwrite.databases.deleteDocument(
    PUBLIC_DATABASE_ID,
    PUBLIC_MESSAGES_ID,
    messageId
  );
};
