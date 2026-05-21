"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // SESSION
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // THEME
    useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }

        setDarkMode(!darkMode);
    };

    // LOGOUT
    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <nav className="sticky top-0 z-50 bg-blue-500 dark:bg-gray-900 text-white shadow-md">

            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* LOGO */}
                <div className="flex items-center gap-3">

                    <img
                        src="/assets/logo.jpg"
                        alt="DocAppoint Logo"
                        className="w-14 h-14 rounded-full object-cover border-2 border-white"
                    />

                    <h1 className="text-2xl font-bold">
                        DocAppoint
                    </h1>

                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-6 font-medium">

                    <Link href="/" className="hover:text-blue-200 transition">
                        Home
                    </Link>

                    <Link
                        href="/all-appointments"
                        className="hover:text-blue-200 transition"
                    >
                        All Appointments
                    </Link>

                    <Link
                        href="/dashboard"
                        className="hover:text-blue-200 transition"
                    >
                        Dashboard
                    </Link>

                    {/* THEME BUTTON */}
                    <button
                        onClick={toggleTheme}
                        className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* USER */}
                    {user ? (

                        <div className="flex items-center gap-3">

                            <img
                                src={user.image || "/assets/default-user.png"}
                                alt="user"
                                className="w-11 h-11 rounded-full border-2 border-white object-cover"
                            />

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>

                        </div>

                    ) : (

                        <div className="flex items-center gap-3">

                            <Link href="/login">
                                <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg transition">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg transition">
                                    Register
                                </button>
                            </Link>

                        </div>
                    )}

                </div>

                {/* MOBILE */}
                <div className="md:hidden flex items-center gap-3">

                    {/* THEME */}
                    <button
                        onClick={toggleTheme}
                        className="bg-white/20 p-2 rounded-full"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* MENU BUTTON */}
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

            </div>

            {/* MOBILE MENU */}
            {open && (

                <div className="md:hidden bg-blue-600 dark:bg-gray-800 px-6 pb-6 pt-2 space-y-4">

                    <Link
                        className="block hover:text-blue-200"
                        href="/"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>

                    <Link
                        className="block hover:text-blue-200"
                        href="/all-appointments"
                        onClick={() => setOpen(false)}
                    >
                        All Appointment
                    </Link>

                    <Link
                        className="block hover:text-blue-200"
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <hr className="border-white/20" />

                    {user ? (

                        <div className="flex items-center justify-between">

                            <img
                                src={user.image || "/assets/default-user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border"
                            />

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>

                        </div>

                    ) : (

                        <div className="flex flex-col gap-3">

                            <Link href="/login">
                                <button className="w-full bg-green-500 py-2 rounded-lg">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="w-full bg-orange-500 py-2 rounded-lg">
                                    Register
                                </button>
                            </Link>

                        </div>

                    )}

                </div>

            )}

        </nav>
    );
}