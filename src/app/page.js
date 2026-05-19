import DoctorCard from "@/components/DoctorCard";
import Hero from "@/components/Hero";
import doctors from "../data/doctors.json";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";


async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [];
}


export default async function Home() {
  await getData();

  return (
    <main>
      <Hero />
      <section className="py-16 text-center bg-gray-50">

        <h2 className="text-4xl font-bold text-gray-900">
          Top Rated Doctors
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Meet our highly experienced and trusted medical professionals,
          carefully selected based on ratings and patient feedback.
        </p>

      </section>
      <section className="py-16 bg-gray-50 flex flex-wrap justify-center gap-8">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} index={index} />
        ))}
      </section>
      <WhyChoose />
      <Testimonials />
    </main>
  );
}
