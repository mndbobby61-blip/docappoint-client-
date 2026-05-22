import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns/promises";

// Fix for MongoDB DNS issues (Vercel/Atlas safe)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ENV CHECK
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
}

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is missing in .env.local");
}

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("docappoint");

// AUTH CONFIG
export const auth = betterAuth({
    //  Core settings
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    //  Allowed origins (MUST match .env.local frontend)
    trustedOrigins: [
        "http://localhost:3000",
        "https://docappoint-client-6gz9.vercel.app"
    ],

    //  Database
    database: mongodbAdapter(db, {
        client,
    }),

    //  Email login
    emailAndPassword: {
        enabled: true,
    },

    // 🔥 Google login
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});