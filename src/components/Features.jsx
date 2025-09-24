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
    <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            {f.icon}
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold">
              {f.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;