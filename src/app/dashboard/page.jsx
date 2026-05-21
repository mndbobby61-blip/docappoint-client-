"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import BookingCard from "@/app/dashboard/components/BookingCard";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const [bookings, setBookings] = useState([]);
    const [editBooking, setEditBooking] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("profile");

    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const session = await authClient.getSession();

            if (!session?.data?.user) {
                router.push("/login");
                return;
            }

            setUser(session.data.user);

            const res = await fetch("http://localhost:8080/api/bookings");
            const data = await res.json();

            const userBookings = data.filter(
                (b) => b && b.userEmail === session.data.user.email
            );

            setBookings(userBookings);
            setLoading(false);
        };

        init();
    }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editBooking?._id) {
        toast.error("No booking selected!");
        return;
    }

    const form = e.target;

    const updatedData = {
        patientName: form.patientName.value,
        gender: form.gender.value,
        phone: form.phone.value,
        appointmentDate: form.appointmentDate.value,
        appointmentTime: form.appointmentTime.value,
    };

    try {
        const res = await fetch(
            `http://localhost:8080/api/bookings/${editBooking._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            }
        );

        const data = await res.json(); // 👈 IMPORTANT

        console.log("UPDATE RESPONSE:", data);

        if (!res.ok) {
            toast.error("Update failed!");
            return;
        }

        setBookings((prev) =>
            prev.map((b) =>
                b._id === editBooking._id ? data : b
            )
        );

        setEditBooking(null);

        toast.success("Appointment updated successfully!");

    } catch (error) {
        console.log(error);
        toast.error("Server error!");
    }
};

    const handleDeleteUI = (id) => {
        setBookings((prev) => prev.filter((b) => b._id !== id));
    };

    if (loading) {
        return (
            <div className="text-center p-10 text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            {/* TABS */}
            <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-md w-fit">

                <button
                    onClick={() => setTab("profile")}
                    className={`px-6 py-2 rounded-xl ${
                        tab === "profile"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600"
                    }`}
                >
                    My Profile
                </button>

                <button
                    onClick={() => setTab("bookings")}
                    className={`px-6 py-2 rounded-xl ${
                        tab === "bookings"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600"
                    }`}
                >
                    My Bookings
                </button>

            </div>

            {/* PROFILE */}
            {tab === "profile" && (
                <div className="bg-white p-8 rounded-2xl shadow">
                    <img
                        src={user?.image}
                        className="w-20 h-20 rounded-full"
                    />
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p>{user?.email}</p>
                </div>
            )}

            {/* BOOKINGS */}
            {tab === "bookings" && (
                <div className="grid md:grid-cols-2 gap-5">

                    {bookings
                        ?.filter((b) => b && b._id)
                        .map((b) => (
                            <BookingCard
                                key={b._id}
                                booking={b}
                                onDelete={handleDeleteUI}
                                onUpdate={setEditBooking}
                            />
                        ))}

                </div>
            )}

            {/* UPDATE MODAL */}
            {editBooking && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md">

                        <h2 className="text-xl font-bold mb-4">
                            Update Appointment
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-3">

                            <input
                                defaultValue={editBooking.doctorName}
                                readOnly
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="patientName"
                                defaultValue={editBooking.patientName}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="gender"
                                defaultValue={editBooking.gender}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="phone"
                                defaultValue={editBooking.phone}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="date"
                                name="appointmentDate"
                                defaultValue={editBooking.appointmentDate}
                                className="w-full border p-2 rounded"
                            />

                            <input
                                name="appointmentTime"
                                defaultValue={editBooking.appointmentTime}
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex gap-2">

                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditBooking(null)}
                                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}