import doctors from "@/data/doctors.json";
import DoctorClient from "@/app/doctors/Client";

export default async function DoctorDetails({ params }) {
    const { id } = await params; 

    const doctor = doctors.find(
        (d) => String(d.id) === String(id)
    );

    if (!doctor) {
        return (
            <div className="p-10 text-center text-red-500">
                Doctor not found 😢
            </div>
        );
    }

    return <DoctorClient doctor={doctor} />;
}