import { BookOpen, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
        <BookOpen className="w-6 h-6" />
        <span>HomeSchooling</span>
      </div>
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/">Home</Link>
        <Link to="/login" className="flex items-center gap-1 text-indigo-600">
          <LogIn className="w-4 h-4" /> Login
        </Link>
        <Link to="/register" className="flex items-center gap-1 text-indigo-600">
          <LogIn className="w-4 h-4" /> Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;