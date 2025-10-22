import { Menu, X, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-violet-500/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 p-3 rounded-2xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-white tracking-tight">HomeSchooling</span>
              <div className="text-xs text-violet-400 font-medium">Learn Differently</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/" className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium">Features</Link>
            <Link to="/" className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium">About</Link>
            <Link to="/login" className="ml-4 px-5 py-2.5 text-gray-300 hover:text-white transition-colors font-medium border border-gray-700 rounded-xl hover:border-violet-500">
              Login
            </Link>
            <Link to="/register" className="relative ml-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 space-y-2">
            <a href="#" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all">Home</a>
            <a href="#features" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all">Features</a>
            <a href="#about" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-violet-500/20 rounded-xl transition-all">About</a>
            <a href="#" className="block px-4 py-3 text-center border border-gray-700 rounded-xl text-white hover:border-violet-500 transition-all">Login</a>
            <a href="#" className="block px-4 py-3 text-center bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl">Get Started</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;