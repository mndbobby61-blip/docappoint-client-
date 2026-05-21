"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function BookingForm({ doctor }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const form = new FormData(e.target);

    const booking = {
      doctorName: doctor.name,
      userEmail: session.user.email,
      patientName: form.get("patientName"),
      phone: form.get("phone"),
      date: form.get("date"),
      time: form.get("time"),
    };

    const res = await fetch("http://localhost:8080/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (res.ok) {
      alert("Appointment booked successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            defaultValue={doctor.name}
            readOnly
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="patientName"
            placeholder="Patient Name"
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="date"
            type="date"
            className="w-full border p-3 rounded-xl"
          />

          <select name="time" className="w-full border p-3 rounded-xl">
            {doctor.availability.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-xl"
          >
            Confirm Booking
          </button>

        </form>

      </div>
    </div>
  );
}