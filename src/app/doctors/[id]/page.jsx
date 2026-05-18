import doctors from "@/data/doctors.json";
import Link from "next/link";

export default async function DoctorDetails({ params }) {

    const { id } = await params;
    const doctor = doctors[id];

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
                Doctor not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-6">

            {/* premium card */}
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">

                {/* image section */}
                <div className="relative group">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    {/* rating badge */}
                    <div className="absolute top-5 right-5 bg-transparent shadow-2xl backdrop-blur px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⭐ {doctor.rating}
                    </div>
                </div>

                {/* content */}
                <div className="p-8 space-y-5">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {doctor.name}
                        </h1>

                        <p className="text-cyan-600 font-medium mt-1 text-lg">
                            {doctor.specialty}
                        </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {doctor.description}
                    </p>

                    {/* info grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <p className="font-semibold">Hospital</p>
                            <p>{doctor.hospital}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <p className="font-semibold">Location</p>
                            <p>{doctor.location}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <p className="font-semibold">Experience</p>
                            <p>{doctor.experience}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <p className="font-semibold">Consultation Fee</p>
                            <p className="text-cyan-600 font-bold">৳ {doctor.fee}</p>
                        </div>

                    </div>

                    {/* button */}
                    <div className="pt-6 flex justify-between items-center">

                        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg hover:scale-105 transition">
                            Book Appointment
                        </button>

                        <Link href="/">
                            <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                                Back
                            </button>
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
}