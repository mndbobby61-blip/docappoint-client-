"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের পাথ অনুযায়ী

export default function BookingPage() {
    const [loading, setLoading] = useState(false);
    
    // 💡 হুক বা সেশন ডেটা কম্পোনেন্টের একদম উপরে (Top Level) কল করতে হবে
    // (যদি সেশন থেকে ইউজারের ইমেইল বা ডাটা নিতে চান)
    const { data: session } = authClient.useSession(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.target);
        
        // ফর্ম থেকে ডাটা নেওয়া
        const bookingData = {
            userEmail: session?.user?.email || "guest@example.com",
            doctorName: form.get("doctorName"),
            patientName: form.get("patientName"),
            gender: form.get("gender"),
            phone: form.get("phone"),
            appointmentDate: form.get("appointmentDate"),
            appointmentTime: form.get("appointmentTime"),
        };

        try {
            // এক্সপ্রেস ব্যাকএন্ডে ডাটা পাঠানো (পোস্ট রুট)
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert("✅ Booking Successful!");
                e.target.reset(); // ফর্ম খালি করার জন্য
            } else {
                alert("❌ Booking Failed!");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("❌ Server error, try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* আপনার বুকিং ফর্মের ইনপুট ফিল্ডগুলো এখানে থাকবে */}
            <button type="submit" disabled={loading}>
                {loading ? "Booking..." : "Book Appointment"}
            </button>
        </form>
    );
}