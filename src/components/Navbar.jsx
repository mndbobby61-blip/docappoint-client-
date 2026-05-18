"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // dummy user test
    const user = {
        name: "Bobby",
        image: "https://i.ibb.co/4pDNDk1/avatar.png",
    };

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

    return (
        <nav className="sticky top-0 z-50 bg-blue-500 dark:bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* logo */}
                <div className="flex items-center gap-3">
                    <img src="/assets/logo.jpg" alt="DocAppoint Logo" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                    <h1 className="text-2xl font-bold">DocAppoint</h1>
                </div>
                

                {/* desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/appointments">All Appointment</Link>
                    <Link href="/dashboard">Dashboard</Link>

                    <button onClick={toggleTheme}>
                        {darkMode ? <Sun /> : <Moon />}
                    </button>

                    {user ? (
                        <img
                            src={user.image}
                            alt="user"
                            className="w-10 h-10 rounded-full border"
                        />
                    ) : (
                        <>
                            <button className="bg-green-600 px-4 py-2 rounded">
                                Login
                            </button>
                            <button className="bg-orange-500 px-4 py-2 rounded">
                                Register
                            </button>
                        </>
                    )}
                </div>

                {/* mobile */}
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={toggleTheme}>
                        {darkMode ? <Sun /> : <Moon />}
                    </button>

                    <button onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <Link className="block" href="/">Home</Link>
                    <Link className="block" href="/appointments">All Appointment</Link>
                    <Link className="block" href="/dashboard">Dashboard</Link>
                </div>
            )}
        </nav>
    );
}