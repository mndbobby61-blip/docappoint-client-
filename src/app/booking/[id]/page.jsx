"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function BookingPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();
    
    // Better-Auth সেশন টপ-লেভেলে কল করা হয়েছে
    const { data: session } = authClient.useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        if (!session?.user) {
            setMessage({ type: "error", text: "Please login first to book an appointment!" });
            setLoading(false);
            return;
        }

        const form = new FormData(e.target);
        
        const bookingData = {
            userEmail: session.user.email,
            doctorName: form.get("doctorName"),
            patientName: form.get("patientName"),
            gender: form.get("gender"),
            phone: form.get("phone"),
            appointmentDate: form.get("appointmentDate"),
            appointmentTime: form.get("appointmentTime"),
        };

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                setMessage({ type: "success", text: "🎉 Appointment Booked Successfully!" });
                e.target.reset();
                setTimeout(() => router.push("/dashboard"), 1500); // সাকসেস হলে ড্যাশবোর্ডে নিয়ে যাবে
            } else {
                setMessage({ type: "error", text: "Failed to save booking. Try again." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Server connection failed!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50 flex items-center justify-center p-4 md:p-10">
            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white p-6 md:p-10">
                
                <div className="text-center mb-8">
                    <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Premium Care</span>
                    <h2 className="text-3xl font-bold text-slate-800 mt-2">Book Your Appointment</h2>
                    <p className="text-slate-500 text-sm mt-1">Fill in the details below to secure your premium doctor consultation.</p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl mb-6 text-center text-sm font-medium border ${
                        message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Select Doctor</label>
                            <select name="doctorName" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700 font-medium" required>
                                <option value="">Choose a specialist...</option>
                                <option value="Dr. Ariful Islam (Cardiologist)">Dr. Ariful Islam (Cardiologist)</option>
                                <option value="Dr. Nusrat Jahan (Dermatologist)">Dr. Nusrat Jahan (Dermatologist)</option>
                                <option value="Dr. Tanvir Rahman (Neurologist)">Dr. Tanvir Rahman (Neurologist)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Patient's Full Name</label>
                            <input name="patientName" type="text" placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700" required />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Gender</label>
                            <select name="gender" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Phone Number</label>
                            <input name="phone" type="tel" placeholder="+880 1XXX XXXXXX" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700" required />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Preferred Date</label>
                            <input name="appointmentDate" type="date" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700" required />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">Preferred Time Slot</label>
                            <select name="appointmentTime" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700" required>
                                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-cyan-600/20 transition-all duration-300 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Confirm Appointment"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}