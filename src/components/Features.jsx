import { Users, Laptop, Award } from "lucide-react";

const features = [
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: "Community Support",
    desc: "Join a thriving community of parents and learners.",
  },
  {
    icon: <Laptop className="w-8 h-8 text-indigo-600" />,
    title: "Interactive Learning",
    desc: "Engaging lessons tailored to every student’s pace.",
  },
  {
    icon: <Award className="w-8 h-8 text-indigo-600" />,
    title: "Certified Programs",
    desc: "Trusted and recognized curriculum worldwide.",
  },
];

const Features = () => {
  return (
    <section className="px-8 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-10 mt-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            {f.icon}
            <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;