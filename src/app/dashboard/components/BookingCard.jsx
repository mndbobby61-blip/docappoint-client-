"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BookingCard({ booking, onDelete, onUpdate }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${booking._id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            onDelete(booking._id);
            toast.success("Appointment deleted successfully!");
        } else {
            toast.error("Delete failed!");
        }

        setLoading(false);
    };

    return (
        <div className="relative group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition overflow-hidden">

            <div className="relative">

                <h2 className="text-xl font-bold text-gray-800">
                    {booking.doctorName}
                </h2>

                <p className="text-gray-600 mt-1">
                    👤 {booking.patientName}
                </p>

                <div className="mt-3 text-sm text-gray-500 space-y-1">
                    <p>📅 {booking.appointmentDate}</p>
                    <p>⏰ {booking.appointmentTime}</p>
                    <p>📞 {booking.phone}</p>
                </div>

                <div className="flex gap-3 mt-5">

                    <button
                        onClick={() => onUpdate(booking)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm"
                    >
                        Update
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>
        </div>
    );
}