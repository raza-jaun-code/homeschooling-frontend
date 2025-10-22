import { ArrowRight , Play , Star, Shield} from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/50 to-slate-950 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-violet-500/10 backdrop-blur-sm px-5 py-2 rounded-full border border-violet-500/30">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 border-2 border-slate-950"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 border-2 border-slate-950"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 border-2 border-slate-950"></div>
            </div>
            <span className="text-sm font-semibold text-violet-300">Join 50,000+ Families</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
            Education That
            <br />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Adapts to You</span>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Revolutionary homeschooling platform. Personalized learning paths, real-time progress tracking, and a global community of educators.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col mt-10 sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#" className="group relative px-10 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a href="#" className="group flex items-center space-x-3 px-10 py-5 bg-slate-800/50 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border border-gray-700 hover:border-violet-500 transition-all duration-300">
              <div className="w-12 h-7 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white ml-1" />
              </div>
              <span>Watch Demo</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-2 text-gray-400 font-semibold">4.9/5 from 12k reviews</span>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Accredited & Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
    </div>
  );
};

export default Hero;