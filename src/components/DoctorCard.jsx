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
        <div className="w-80 bg-white shadow-md hover:shadow-xl rounded-2xl p-5 transition flex flex-col justify-between">
            <div>
                <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover rounded-xl" />
                <h2 className="text-xl font-bold mt-3 text-gray-800">{doctor.name}</h2>
                <p className="text-cyan-600 font-medium text-sm">{doctor.specialty}</p>
                <p className="text-xs text-gray-400 mt-1">{doctor.hospital}</p>
            </div>

            <button
                onClick={handleViewDetails}
                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2.5 rounded-xl transition"
            >
                View Details & Book
            </button>
        </div>
    );
}