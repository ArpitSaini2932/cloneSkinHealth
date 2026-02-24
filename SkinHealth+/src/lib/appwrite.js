import { Account, Client, ID } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  // eslint-disable-next-line no-console
  console.warn("Appwrite is not configured. Set VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID.");
}

const client = new Client().setEndpoint(endpoint || "").setProject(projectId || "");

const account = new Account(client);

export { account, ID };
