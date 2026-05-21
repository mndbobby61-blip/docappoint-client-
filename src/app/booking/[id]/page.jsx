import { redirect } from "next/navigation";

async function getDoctors() {
    const res = await fetch("http://localhost:3000/api/doctors", {
        cache: "no-store",
    });
    return res.json();
}

export default async function BookingPage({ params }) {
    const doctors = await getDoctors();

    const doctor = doctors.find((d) => d.id === params.id);

    if (!doctor) {
        redirect("/login");
    }

    const {id} = params;

    return (
        <div className="max-w-2xl mx-auto py-10 px-5">

            <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

            <div className="bg-white shadow-lg rounded-2xl p-6">

                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-cyan-600 mb-6">{doctor.specialty}</p>

                <form className="space-y-4">

                    <input className="w-full border p-3 rounded-lg" placeholder="Patient Name" />

                    <select className="w-full border p-3 rounded-lg">
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                    <input className="w-full border p-3 rounded-lg" placeholder="Phone Number" />

                    <input type="date" className="w-full border p-3 rounded-lg" />

                    <select className="w-full border p-3 rounded-lg">
                        {doctor.availability.map((t, i) => (
                            <option key={i}>{t}</option>
                        ))}
                    </select>

                    <button className="w-full bg-cyan-600 text-white py-3 rounded-lg">
                        Confirm Appointment
                    </button>

                </form>

            </div>
        </div>
    );
}