"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ১. সাধারণ ইমেইল/পাসওয়ার্ড লগইন
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        }, {
            onSuccess: () => {
                router.push("/dashboard");
                router.refresh();
            },
            onError: (ctx) => {
                setError(ctx.error.message);
                setLoading(false);
            }
        });
    };

    // ২. গুগল সোশ্যাল লগইন অপশন
    const handleGoogleLogin = async () => {
        setError("");
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        }, {
            onError: (ctx) => {
                setError(ctx.error.message);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-sm">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Login to manage your appointments</p>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center text-sm font-medium">
                        {error}
                    </p>
                )}

                {/* গুগল লগইন বাটন */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border p-3 rounded-xl hover:bg-gray-50 font-medium transition text-gray-700 mb-4"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Continue with Google
                </button>

                <div className="flex items-center my-4 text-gray-400 text-xs">
                    <div className="flex-1 border-t"></div>
                    <span className="px-3">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>

                {/* সাধারণ ইমেইল ফর্ম */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
                        <input name="email" type="email" placeholder="you@example.com" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-cyan-500" required />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Password</label>
                        <input name="password" type="password" placeholder="••••••••" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-cyan-500" required />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50">
                        {loading ? "Signing In..." : "Sign In with Email"}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-6">
                    Don't have an account? <Link href="/register" className="text-cyan-600 hover:underline font-medium">Register here</Link>
                </p>
            </div>
        </div>
    );
}