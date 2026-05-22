import doctors from "@/data/doctors.json";
import BookingForm from "@/components/appointments/BookingForm";
import { redirectpath } from "next/navigation";

export default async function BookingPage({ params }) {

    const { id } = await params;

    const doctor = doctors.find((d) => d.id === id);

    if (!doctor) {
        redirectpath("/");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-16 px-4">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE */}
                <div>

                    <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-semibold">
                        Premium Doctor
                    </span>

                    <h1 className="text-4xl font-bold text-gray-800 mt-4">
                        {doctor.name}
                    </h1>

                    <p className="text-cyan-600 font-semibold mt-2">
                        {doctor.specialty}
                    </p>

                    <p className="text-gray-600 mt-5 leading-7">
                        {doctor.description}
                    </p>

                    <div className="mt-6 space-y-2 text-gray-700">

                        <p>
                            <strong>Hospital:</strong> {doctor.hospital}
                        </p>

                        <p>
                            <strong>Location:</strong> {doctor.location}
                        </p>

                        <p>
                            <strong>Experience:</strong> {doctor.experience}
                        </p>

                        <p>
                            <strong>Consultation Fee:</strong> ৳{doctor.fee}
                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <BookingForm doctor={doctor} />

            </div>

        </div>
    );
}