"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { GrGoogle } from "react-icons/gr";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const res = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (res.error) {
      setError(res.error.message);
      return;
    }

    router.push("/");
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
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Access your DocAppoint account
        </p>

        {/* error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 mt-4 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <div className="text-right">
            <Link
              href="#"
              className="text-sm text-cyan-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            Login
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

        {/* register */}
        <p className="text-center mt-6 text-sm text-gray-500">
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