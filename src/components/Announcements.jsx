import { Bell } from "lucide-react";
import { useState } from "react";

const Announcements = () => {
  const [posts] = useState([
    { id: 1, title: "School Holiday", body: "School will be closed on 12th October for a public holiday." },
    { id: 2, title: "New Curriculum", body: "A new math curriculum will be introduced next term." },
    { id: 3, title: "Parent Meeting", body: "Parent-teacher meeting scheduled on 20th Oct." },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#111827] p-3 rounded-lg">
          <Bell className="w-6 h-6 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-white">Announcements</h2>
      </div>

      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-[#0f172a]/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-4">
            <h3 className="font-semibold text-white">{p.title}</h3>
            <p className="text-gray-300 mt-2">{p.body}</p>
            <div className="mt-3 text-xs text-gray-400">Posted recently</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;