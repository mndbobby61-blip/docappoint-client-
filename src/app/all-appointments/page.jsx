import doctors from "@/data/doctors.json";
import DoctorCard from "@/components/DoctorCard";

export default function AllAppointments() {
    return (
        <div className="flex flex-wrap gap-6 justify-center p-10 bg-gray-100 min-h-screen">

            {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
            ))}

        </div>
    );
}