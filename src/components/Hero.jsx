const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-r from-indigo-100 via-white to-indigo-50">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight max-w-3xl">
        Empowering Families Through <span className="text-indigo-600">Homeschooling</span>
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Flexible, personalized, and effective education designed for learners at home.
      </p>
      <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition">
        Get Started
      </button>
    </section>
  );
}

export default Hero;