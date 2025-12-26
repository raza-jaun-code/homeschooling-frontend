import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-10 text-center bg-[#0b0f19] text-gray-200 overflow-hidden">
        {/* Subtle animated gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-transparent opacity-70 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col mt-25 mb-10 items-center max-w-lg">
          <div className="flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full border border-red-500/30 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent mb-4">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-100">
            Page Not Found
          </h2>

          <p className="text-gray-400 mb-8">
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="relative group px-6 py-3 font-semibold text-white rounded-lg bg-[#1e293b] overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Go Back Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;