import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-5xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
export default NotFound;