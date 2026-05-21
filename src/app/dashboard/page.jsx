"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            const session = await authClient.getSession();
            if (!session?.data?.user) {
                router.push("/login");
                return;
            }
            setUser(session.data.user);

            // এক্সপ্রেস সার্ভার থেকে ডাটা গেট করা
            try {
                const response = await fetch("http://localhost:8080/api/bookings");
                const allBookings = await response.json();
                
                // শুধুমাত্র এই ইউজারের বুকিং ফিল্টার
                const userBookings = allBookings.filter(b => b.userEmail === session.data.user.email);
                setBookings(userBookings);
            } catch (error) {
                console.error("Failed to fetch bookings from server:", error);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuthAndFetchData();
    }, [router]);

    const handleDelete = async (dbId) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;

        try {
            // এক্সপ্রেস সার্ভারে ডিলিট রিকোয়েস্ট পাঠানো (_id পাস করা হচ্ছে)
            const response = await fetch(`http://localhost:8080/api/bookings/${dbId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                // UI স্টেট আপডেট করা
                setBookings(bookings.filter((b) => b._id !== dbId));
            } else {
                alert("Failed to delete booking from server.");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    if (loading) return <div className="text-center p-10">Loading Dashboard Data...</div>;
    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                    <p className="text-sm text-gray-500">Logged in as: {user.email}</p>
                </div>
                <button 
                    onClick={async () => {
                        await authClient.signOut();
                        router.push("/login");
                    }}
                    className="text-sm text-red-500 hover:underline"
                >
                    Logout
                </button>
            </div>

            {bookings.length === 0 ? (
                <div className="border border-dashed p-10 text-center rounded-xl text-gray-500">
                    No appointments booked yet in database.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((b) => (
                        <div key={b._id} className="border p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{b.doctorName}</h2>
                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                                    <p><strong className="text-gray-700">Patient:</strong> {b.patientName} ({b.gender})</p>
                                    <p><strong className="text-gray-700">Date:</strong> {b.appointmentDate}</p>
                                    <p><strong className="text-gray-700">Time Slot:</strong> {b.appointmentTime}</p>
                                    <p><strong className="text-gray-700">Phone:</strong> {b.phone}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(b._id)} // মঙ্গোডিবির _id পাস করা হচ্ছে
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-xl mt-4 self-start transition"
                            >
                                Cancel Appointment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}