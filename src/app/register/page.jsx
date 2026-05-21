"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { GrGoogle } from "react-icons/gr";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const name = form.get("name");
        const email = form.get("email");
        const image =
            form.get("image") ||
            "https://i.ibb.co/4pDNDk1/default-avatar.png";
        const password = form.get("password");

        // password validation
        if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            setError(
                "Password must contain 1 uppercase, 1 lowercase and minimum 6 characters."
            );
            return;
        }

        const res = await authClient.signUp.email({
            name,
            email,
            password,
            image,
            callbackURL: "/",
        });

        if (res.error) {
            setError(res.error.message);
            return;
        }

        router.push("/login");
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-cyan-100">

                {/* title */}
                <h1 className="text-3xl font-bold text-center text-cyan-600">
                    Register
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Create your DocAppoint account
                </p>

                {/* error */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 mt-4 rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="mt-6 space-y-4">

                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        name="image"
                        type="text"
                        placeholder="Photo URL (Optional)"
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Register
                    </button>
                </form>

                {/* divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <p className="px-3 text-sm text-gray-400">OR</p>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* google */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-slate-50 transition font-medium"
                >
                    <GrGoogle className="text-red-500" />
                    Continue with Google
                </button>

                {/* login link */}
                <p className="text-center mt-6 text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-cyan-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}