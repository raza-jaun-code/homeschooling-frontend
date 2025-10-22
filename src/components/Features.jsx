import { Zap , Users, TrendingUp , Laptop , Globe, Award} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "AI-Powered Learning",
      desc: "Adaptive curriculum that evolves with your child's learning style and pace using advanced machine learning.",
      gradient: "from-amber-500 to-orange-500",
      color: "amber"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Global Community",
      desc: "Connect with 50,000+ homeschooling families worldwide. Share resources, tips, and success stories.",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue"
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Real-Time Analytics",
      desc: "Track progress with detailed insights and reports. Identify strengths and areas for improvement instantly.",
      gradient: "from-green-500 to-emerald-500",
      color: "green"
    },
    {
      icon: <Laptop className="w-7 h-7" />,
      title: "Interactive Content",
      desc: "Engage with gamified lessons, 3D simulations, and virtual labs that make learning fun and memorable.",
      gradient: "from-violet-500 to-purple-500",
      color: "violet"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Worldwide Recognition",
      desc: "Accredited programs recognized in 120+ countries. Seamless transition to traditional schools anytime.",
      gradient: "from-pink-500 to-rose-500",
      color: "pink"
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Certified Educators",
      desc: "Access 1,000+ expert tutors and mentors. One-on-one sessions available in any subject, anytime.",
      gradient: "from-indigo-500 to-blue-500",
      color: "indigo"
    },
  ];

  return (
    <div id="features" className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-violet-500/10 rounded-full border border-violet-500/30 mb-6">
            <span className="text-violet-400 font-semibold">Features</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Everything You Need.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Nothing You Don't.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cutting-edge tools designed to transform homeschooling into an extraordinary learning experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-800 hover:border-slate-700 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${f.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {f.desc}
              </p>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${f.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;