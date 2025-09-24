import { BookOpen, LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm relative min-h-[10vh]">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-indigo-600">
          <BookOpen className="w-6 h-6" />
          <span>HomeSchooling</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/login" className="flex items-center gap-1 text-indigo-600">
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 text-indigo-600"
          >
            <LogIn className="w-4 h-4" /> Register
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 z-20">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1 text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="w-4 h-4" /> Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;