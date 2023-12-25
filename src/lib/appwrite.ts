import {
  PUBLIC_ENDPOINT,
  PUBLIC_PROJECT_ID,
} from "$env/static/public";
import { Databases, Account, Client, ID } from "appwrite"

const client = new Client();
client
  .setEndpoint(PUBLIC_ENDPOINT)
  .setProject(PUBLIC_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export const appwrite = {
  client,
  account,
  databases,
  ID
};
