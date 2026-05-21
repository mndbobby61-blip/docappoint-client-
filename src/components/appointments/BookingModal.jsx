"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BookingForm from "./BookingForm";

export default function BookingModal({ doctor, open, setOpen }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setOpen]);

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Background */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-fadeIn">

                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden">

                    {/* Top gradient bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600" />

                    {/* Close button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="px-5 pt-5 pb-3">
                        <h2 className="text-xl font-bold text-gray-800">
                            Book Appointment
                        </h2>
                        <p className="text-sm text-gray-500">
                            {doctor.name} • {doctor.specialty}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-5 pb-5">
                        <BookingForm doctor={doctor} />
                    </div>

                    {/* Glow effect */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />
                </div>
            </div>
        </div>,
        document.body
    );
}