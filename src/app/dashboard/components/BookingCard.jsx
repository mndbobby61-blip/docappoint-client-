"use client";

import { useRouter } from "next/navigation";

export default function BookingCard({ booking }) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/bookings/${booking._id}`, {
      method: "DELETE",
       }),
    });

    router.refresh();
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold">{booking.doctorName}</h2>
      <p>{booking.patientName}</p>
      <p>{booking.date}</p>

      <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1">
        Delete
      </button>
    </div>
  );
}