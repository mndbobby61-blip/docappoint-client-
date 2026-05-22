"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function BookingForm({ doctor, onSuccess }) {

    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!session?.user) {
            setMessage("Please login first");
            setLoading(false);
            return;
        }

        const form = new FormData(e.target);

        const bookingData = {
            userEmail: session.user.email,
            doctorName: doctor.name,
            patientName: form.get("patientName"),
            gender: form.get("gender"),
            phone: form.get("phone"),
            appointmentDate: form.get("appointmentDate"),
            appointmentTime: form.get("appointmentTime"),
        };

        try {
            const res = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                toast.success("Appointment booked successfully!");
                e.target.reset();
                

                setTimeout(() => {
                    onSuccess?.();
                }, 1000);
            }

        } catch (err) {
            setMessage("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2">

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Book Appointment
            </h2>

            <p className="text-sm text-gray-500 mb-5">
                With {doctor.name}
            </p>

            {message && (
                <div className="bg-cyan-50 text-cyan-700 p-3 rounded-xl mb-4 text-sm">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    value={doctor.name}
                    readOnly
                    className="w-full p-3 rounded-xl bg-gray-100"
                />

                <input
                    name="patientName"
                    placeholder="Patient Name"
                    className="w-full p-3 rounded-xl border"
                    required
                />

                <select name="gender" className="w-full p-3 rounded-xl border" required>
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full p-3 rounded-xl border"
                    required
                />

                <input
                    type="date"
                    name="appointmentDate"
                    className="w-full p-3 rounded-xl border"
                    required
                />

                <select name="appointmentTime" className="w-full p-3 rounded-xl border">
                    {doctor.availability.map((t, i) => (
                        <option key={i} value={t}>{t}</option>
                    ))}
                </select>

                <button
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                    {loading ? "Booking..." : "Confirm Appointment"}
                </button>

            </form>

        </div>
    );
}