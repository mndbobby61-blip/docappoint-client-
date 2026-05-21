"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import BookingCard from "@/app/dashboard/components/BookingCard";

export default function DashboardPage() {
    const [bookings, setBookings] = useState([]);
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
                (b) => b.userEmail === session.data.user.email
            );

            setBookings(userBookings);
            setLoading(false);
        };

        init();
    }, []);

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

            {/* ===== TOP TABS (CARD STYLE) ===== */}
            <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-md border-gray-500 w-fit">

                <button
                    onClick={() => setTab("profile")}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition shadow-sm
                        ${tab === "profile"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    My Profile
                </button>

                <button
                    onClick={() => setTab("bookings")}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition shadow-sm
                        ${tab === "bookings"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    My Bookings
                </button>

            </div>

            {/* ================= PROFILE CARD ================= */}
            {tab === "profile" && (
                <div className="bg-white rounded-2xl shadow-xl border-gray-500 p-8 hover:shadow-2xl transition">

                    <div className="flex items-center gap-6">

                        <img
                            src={user?.image}
                            className="w-24 h-24 rounded-full shadow-lg border-4 border-cyan-100"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {user?.name}
                            </h2>
                            <p className="text-gray-500">
                                {user?.email}
                            </p>
                        </div>

                    </div>

                    {/* INFO CARDS */}
                    <div className="mt-8 grid md:grid-cols-2 gap-5">

                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl shadow-md border-gray-500 hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Account Status</p>
                            <p className="text-lg font-bold text-green-600 mt-1">
                                Active
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl shadow-md border-gray-500 hover:shadow-lg transition">
                            <p className="text-sm text-gray-500">Total Bookings</p>
                            <p className="text-lg font-bold text-cyan-600 mt-1">
                                {bookings.length}
                            </p>
                        </div>

                    </div>

                </div>
            )}

            {/* ================= BOOKINGS SECTION ================= */}
            {tab === "bookings" && (
                <div className="space-y-5">

                    <h1 className="text-3xl font-bold text-gray-800">
                        My Bookings
                    </h1>

                    {bookings.length === 0 ? (
                        <div className="bg-white p-10 rounded-2xl shadow-md border-gray-500 text-center text-gray-500">
                            No bookings found
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">

                            {bookings.map((b) => (
                                <div
                                    key={b._id}
                                    className="shadow-lg hover:shadow-2xl transition rounded-2xl"
                                >
                                    <BookingCard
                                        booking={b}
                                        onDelete={handleDeleteUI}
                                    />
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}