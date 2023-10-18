import { Client, Storage } from 'appwrite';

const client = new Client();
export const storage = new Storage(client)

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);
