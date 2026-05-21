"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DoctorCard({ doctor }) {

    const router = useRouter();

    const handleViewDetails = async () => {

        const session = await authClient.getSession();

        // ✅ check correctly
        if (!session?.data?.user) {
            router.push("/login");
            return;
        }

        // ✅ logged in
        router.push(`/doctors/${doctor.id}`);
    };

    if (!doctor) return null;

    return (
        <div className="group w-80 rounded-2xl bg-white shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

            {/* image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-3 right-3 bg-transparent border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
                    Rating: {doctor.rating}
                </div>
            </div>

            {/* content */}
            <div className="p-5">

                <h2 className="text-xl font-bold text-gray-900">
                    {doctor.name}
                </h2>

                <p className="text-cyan-600 font-medium mt-1">
                    {doctor.specialty}
                </p>

                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                    {doctor.description}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                    Hospital: {doctor.hospital}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    Location: {doctor.location}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                    Experience: {doctor.experience}
                </p>

                {/* footer */}
                <div className="flex items-center justify-between mt-6">

                    <span className="text-lg font-bold text-cyan-600">
                        ৳ {doctor.fee}
                    </span>

                    <button
                        onClick={handleViewDetails}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        View Details
                    </button>

                </div>

            </div>
        </div>
    );
}