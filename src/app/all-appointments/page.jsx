"use client";

import { useState } from "react";
import doctors from "@/data/doctors.json";
import DoctorCard from "@/components/DoctorCard";

export default function AllAppointments() {

    const [search, setSearch] = useState("");

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            {/* SEARCH */}

            <div className="max-w-xl mx-auto mb-10">

                <input
                    type="text"
                    placeholder="Search doctor by name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-cyan-500"
                />

            </div>

            {/* DOCTORS */}

            <div className="flex flex-wrap gap-6 justify-center">

                {filteredDoctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                    />
                ))}

            </div>

        </div>
    );
}