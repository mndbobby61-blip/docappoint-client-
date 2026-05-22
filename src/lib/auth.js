import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const clientPromise = client.connect();

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,

    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        process.env.BETTER_AUTH_URL,
    ],

    database: mongodbAdapter(
        (await clientPromise).db("docappoint")
    ),

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