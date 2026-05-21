"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function RegisterPage() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // =========================
    // REGISTER
    // =========================
    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        const form = new FormData(e.target);

        const name = form.get("name");
        const email = form.get("email");
        const image = form.get("image");
        const password = form.get("password");

        // =========================
        // PASSWORD VALIDATION
        // =========================

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {

            const message =
                "Password must contain uppercase, lowercase and minimum 6 characters.";

            setError(message);

            toast.error(message);

            setLoading(false);

            return;
        }

        // =========================
        // REGISTER API
        // =========================

        await authClient.signUp.email({

            email,
            password,
            name,
            image,
            callbackURL: "/login",

        }, {

            onSuccess: () => {

                toast.success("Registration successful!");

                router.push("/login");

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
    // GOOGLE REGISTER
    // =========================
    const handleGoogleRegister = async () => {

        setError("");

        await authClient.signIn.social({

            provider: "google",
            callbackURL: "/",

        }, {

            onSuccess: () => {

                toast.success("Google signup successful!");

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
                        Register
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your account to book doctor appointments
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
                        OR REGISTER WITH EMAIL
                    </span>

                    <div className="flex-1 border-t"></div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    {/* NAME */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="w-full border border-gray-200 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

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

                    {/* PHOTO URL */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo URL
                        </label>

                        <input
                            name="image"
                            type="text"
                            placeholder="https://example.com/photo.jpg"
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

                        <p className="text-xs text-gray-500 mt-2">
                            Must contain uppercase, lowercase & minimum 6 characters
                        </p>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-2xl font-semibold transition duration-300 shadow-lg disabled:opacity-50"
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }

                    </button>

                      {/* GOOGLE BUTTON */}
                <button
                    onClick={handleGoogleRegister}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-200 p-3 rounded-2xl hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm"
                >

                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="w-5 h-5"
                        alt="Google"
                    />

                    Continue with Google

                </button>

                </form>

                {/* LOGIN */}
                <p className="text-center text-sm text-gray-600 mt-8">

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