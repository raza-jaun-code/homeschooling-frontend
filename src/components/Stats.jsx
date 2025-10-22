const Stats = () => {
  const stats = [
    { value: "50K+", label: "Active Families" },
    { value: "1M+", label: "Lessons Completed" },
    { value: "120+", label: "Countries" },
    { value: "98%", label: "Success Rate" }
  ];

  return (
    <div className="relative py-24 bg-gradient-to-b from-slate-950 via-violet-950/30 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-violet-400 to-pink-400 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;