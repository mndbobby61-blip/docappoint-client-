"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DoctorCard({ doctor }) {

    const router = useRouter();

    const handleViewDetails = async () => {

        const session = await authClient.getSession();

        if (!session?.data?.user) {

            router.push("/login");
            return;
        }

        router.push(`/doctors/${doctor.id}`);
    };

    return (

        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            {/* Image */}
            <div className="relative overflow-hidden">

                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-cyan-700 shadow">
                    ⭐ {doctor.rating}
                </div>

            </div>

            {/* Content */}
            <div className="p-6">

                <div className="mb-3">

                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {doctor.specialty}
                    </span>

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                </h2>

                <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                    {doctor.description}
                </p>

                <div className="space-y-3 mb-6">

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            Hospital
                        </span>

                        <span className="font-medium text-gray-700">
                            {doctor.hospital}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            Fee
                        </span>

                        <span className="font-bold text-cyan-700">
                            ৳ {doctor.fee}
                        </span>
                    </div>

                </div>

                <button
                    onClick={handleViewDetails}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-600/20"
                >
                    View Details
                </button>

            </div>
        </div>
    );
}