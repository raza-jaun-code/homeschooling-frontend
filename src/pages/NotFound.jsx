import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 sm:px-6">
        <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4 sm:mb-6" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          404
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-md">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;