import { authClient } from "@/lib/auth-client";

export const requireAuth = async (router) => {
    const session = await authClient.getSession();

    if (!session?.user) {
        router.push("/login");
        return null;
    }

    return session;
};