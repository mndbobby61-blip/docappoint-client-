import { redirect } from "next/navigation";
import BookingForm from "@/components/appointments/BookingForm";
import doctors from "@/data/doctors.json";

export default async function DoctorDetails({ params }) {
    const { id } = await params;
    const doctor = doctors.find((d) => d.id === id);

    if (!doctor) {
        redirect("/");
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <img src={doctor.image} alt={doctor.name} className="w-full h-[400px] object-cover rounded-xl" />

            <h1 className="text-3xl font-bold mt-4">{doctor.name}</h1>
            <p className="text-cyan-600">{doctor.specialty}</p>
            <p className="mt-4">{doctor.description}</p>
            <p className="mt-2 text-gray-600"><strong>Hospital:</strong> {doctor.hospital}</p>
            <p className="text-gray-600"><strong>Fee:</strong> {doctor.fee} BDT</p>

            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Book Your Slot Directly</h3>
                {/* সরাসরি ফর্মটি রেন্ডার করা হলো কোনো পপআপ ঝামেলা ছাড়া */}
                <BookingForm doctor={doctor} />
            </div>
        </div>
    );
}