import Link from "next/link";
import { redirect } from "next/navigation";

async function getDoctor(id) {
  const res = await fetch(`http://localhost:8080/doctors/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function DoctorDetails({ params }) {
  const doctor = await getDoctor(params.id);

  if (!doctor) {
    redirect("/login");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <img src={doctor.image} className="w-full h-[400px] object-cover rounded-2xl" />

      <h1 className="text-4xl font-bold mt-6">{doctor.name}</h1>
      <p className="text-cyan-600 text-xl mt-2">{doctor.specialty}</p>

      <p className="mt-4 text-gray-600">{doctor.description}</p>

      <div className="mt-6 space-y-2">
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Hospital:</strong> {doctor.hospital}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
        <p><strong>Fee:</strong> ৳ {doctor.fee}</p>
      </div>

      <div className="mt-8">
        <Link href={`/booking/${doctor._id}`}>
          <button className="bg-cyan-600 text-white px-6 py-3 rounded-xl">
            Book Appointment
          </button>
        </Link>
      </div>

    </div>
  );
}