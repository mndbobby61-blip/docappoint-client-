"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ১. সাধারণ ইমেইল দিয়ে সাইন আপ
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const password = form.get("password");

        await authClient.signUp.email({
            email,
            password,
            name,
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

    // ২. গুগল দিয়ে সরাসরি সাইন আপ/লগইন
    const handleGoogleRegister = async () => {
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
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h2>
                <p className="text-sm text-gray-500 text-center mb-6">Sign up to start booking appointments</p>

                {error && (
                    <p className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center text-sm font-medium">
                        {error}
                    </p>
                )}

                {/* গুগল সাইন আপ বাটন */}
                <button
                    onClick={handleGoogleRegister}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border p-3 rounded-xl hover:bg-gray-50 font-medium transition text-gray-700 mb-4"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Sign Up with Google
                </button>

                <div className="flex items-center my-4 text-gray-400 text-xs">
                    <div className="flex-1 border-t"></div>
                    <span className="px-3">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>

                {/* সাধারণ ফর্ম */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
                        <input name="name" type="text" placeholder="John Doe" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-cyan-500" required />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Email Address</label>
                        <input name="email" type="email" placeholder="you@example.com" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-cyan-500" required />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-1">Password</label>
                        <input name="password" type="password" placeholder="••••••••" className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-cyan-500" required />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50">
                        {loading ? "Registering..." : "Register with Email"}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-6">
                    Already have an account? <Link href="/login" className="text-cyan-600 hover:underline font-medium">Login here</Link>
                </p>
            </div>
        </div>
    );
}