"use client";

import { useState } from "react";
import BookingModal from "@/components/appointments/BookingModal";

export default function Client({ doctor }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4">

            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT IMAGE SIDE */}
                <div className="relative h-[500px] md:h-auto">

                    <img
                        src={doctor.image}
                        className="w-full h-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* text on image */}
                    <div className="absolute bottom-6 left-6 text-white">
                        <h1 className="text-3xl font-bold">
                            Dr. {doctor.name}
                        </h1>
                        <p className="text-cyan-200">
                            {doctor.specialty}
                        </p>
                    </div>

                </div>

                {/* RIGHT DETAILS SIDE */}
                <div className="p-8 flex flex-col justify-center space-y-6">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Doctor Details
                        </h2>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            {doctor.description}
                        </p>
                    </div>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-xs text-gray-500">Hospital</p>
                            <p className="font-semibold text-gray-800">
                                {doctor.hospital || "City Medical"}
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-xs text-gray-500">Experience</p>
                            <p className="font-semibold text-gray-800">
                                {doctor.experience || "5+ Years"}
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-xs text-gray-500">Fee</p>
                            <p className="font-semibold text-cyan-600">
                                {doctor.fee || "1000"} BDT
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl">
                            <p className="text-xs text-gray-500">Status</p>
                            <p className="font-semibold text-green-600">
                                Available
                            </p>
                        </div>

                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => setOpen(true)}
                        className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl shadow-lg hover:scale-[1.02] transition"
                    >
                        Book Appointment
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        Instant confirmation • Secure booking system
                    </p>

                </div>

            </div>

            {/* MODAL */}
            <BookingModal
                doctor={doctor}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}