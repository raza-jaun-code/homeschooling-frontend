import { Menu, X, GraduationCap, User, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🛠️ Simplified Scroll Lock: Only hide overflow, remove scrollbar compensation for simplicity
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      // Removed paddingRight logic to avoid conflict with navbar's fixed positioning
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-violet-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 p-3 rounded-2xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tight">
                HomeSchooling
              </span>
              <div className="text-xs text-violet-400 font-medium">
                Learn Differently
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="ml-4 px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium border border-gray-700 rounded-xl hover:border-violet-500 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Login
            </button>
            <Link
              to="/register"
              className="relative ml-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="lg:hidden pb-6 space-y-2">
            <a
              href="#"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all"
            >
              Home
            </a>
            <a
              href="#features"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all"
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all"
            >
              About
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="block w-full px-4 py-3 text-center border border-gray-700 rounded-xl text-white hover:border-violet-500 transition-all flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" /> Login
            </button>
            <a className="block px-4 py-3 text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl">
              Get Started
            </a>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showModal && (
        // 🌟 KEY FIX: Ensure the z-index is high and use 'h-screen' for maximum height
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 h-screen"> 
          <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative mx-4">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Login As
            </h2>

            <div className="flex flex-col gap-4">
              {/* Parent */}
              <Link
                to="/login"
                onClick={() => setShowModal(false)}
                className="flex items-center gap-3 justify-center px-4 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-pink-500/50"
              >
                <User className="w-6 h-6" />
                Parent
              </Link>

              {/* Student */}
              <Link
                to="/student/login"
                onClick={() => setShowModal(false)}
                className="flex items-center gap-3 justify-center px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/50"
              >
                <Users className="w-6 h-6" />
                Student
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;