"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const redirectpath = searchParams.get("redirect") || "/dashboard";

    const router = useRouter();

    // =========================
    // EMAIL LOGIN
    // =========================
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
            callbackURL: redirectpath,

        }, {

            onSuccess: () => {

                toast.success("Login successful!");

                router.push(redirect || "/dashboard");
                router.refresh();

            },

            onError: (ctx) => {

                setError(ctx.error.message);

                toast.error(ctx.error.message);

                setLoading(false);

            }

        });
    };

    // =========================
    // GOOGLE LOGIN
    // =========================
    const handleGoogleLogin = async () => {

        setError("");

        await authClient.signIn.social({

            provider: "google",
            callbackURL: redirect || "/dashboard",

        }, {

            onSuccess: () => {

                toast.success("Google login successful!");

            },

            onError: (ctx) => {

                setError(ctx.error.message);

                toast.error(ctx.error.message);

            }

        });
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white shadow-2xl rounded-3xl p-8">

                {/* TOP */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Access your doctor appointments dashboard
                    </p>

                </div>

                {/* ERROR */}
                {
                    error && (

                        <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm text-center font-medium">
                            {error}
                        </div>

                    )
                }

               

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-6">

                    <div className="flex-1 border-t"></div>

                    <span className="text-xs text-gray-400">
                        OR CONTINUE WITH EMAIL
                    </span>

                    <div className="flex-1 border-t"></div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* EMAIL */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-200 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    {/* PASSWORD */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-200 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="text-right">

                        <button
                            type="button"
                            className="text-sm text-cyan-600 hover:underline"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-2xl font-semibold transition duration-300 shadow-lg disabled:opacity-50"
                    >

                        {
                            loading
                                ? "Signing In..."
                                : "Login"
                        }

                    </button>
                     {/* GOOGLE BUTTON */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-200 p-3 rounded-2xl hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm"
                >

                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />

                    Continue with Google

                </button>

                </form>

                {/* REGISTER */}
                <p className="text-center text-sm text-gray-600 mt-8">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/register"
                        className="text-cyan-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}