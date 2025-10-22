import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-tr from-violet-500 via-purple-500 to-pink-500 p-3 rounded-2xl">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black text-white">HomeSchooling</span>
                <div className="text-xs text-violet-400 font-medium">Learn Differently</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering the next generation through innovative homeschooling solutions. Join thousands of families worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-violet-500 flex items-center justify-center transition-colors">
                <span className="text-white font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-violet-500 flex items-center justify-center transition-colors">
                <span className="text-white font-bold">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-violet-500 flex items-center justify-center transition-colors">
                <span className="text-white font-bold">in</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Curriculum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HomeSchooling. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;