"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
    const [bookings, setBookings] = useState([]);

    const { data: session } = authClient.useSession();
    const email = session?.user?.email;

    // GET BOOKINGS
    useEffect(() => {
        if (!email) return;

        fetch(`http://localhost:8080/bookings/user?email=${email}`)
            .then((res) => res.json())
            .then((data) => setBookings(data));
    }, [email]);

    // DELETE BOOKING (STEP 10)
    const handleDelete = async (id) => {
        await fetch("http://localhost:8080/bookings/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        setBookings(bookings.filter((b) => b._id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {!email ? (
                <p>Loading session...</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                bookings.map((b) => (
                    <div key={b._id} className="border p-4 rounded mb-4">

                        <h2 className="text-xl font-bold">{b.doctorName}</h2>
                        <p>Date: {b.date}</p>
                        <p>Time: {b.time}</p>
                        <p>Patient: {b.patientName}</p>
                        <p>Phone: {b.phone}</p>

                        <button
                            onClick={() => handleDelete(b._id)}
                            className="bg-red-500 text-white px-3 py-1 mt-3 rounded"
                        >
                            Delete
                        </button>

                    </div>
                ))
            )}

        </div>
    );
}