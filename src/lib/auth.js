import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
}

const client = new MongoClient(process.env.MONGODB_URI);

// 🔥 MUST connect
await client.connect();
console.log("🔥 MongoDB Connected Successfully");

const db = client.db("docappoint");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3001"
    ],

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});