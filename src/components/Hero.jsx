const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-28 bg-gradient-to-r from-indigo-100 via-white to-indigo-50">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-snug sm:leading-tight max-w-3xl">
        Empowering Families Through{" "}
        <span className="text-indigo-600">Homeschooling</span>
      </h1>
      <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
        Flexible, personalized, and effective education designed for learners at home.
      </p>
      <button className="mt-6 sm:mt-8 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition">
        Get Started
      </button>
    </section>
  );
};

export default Hero;