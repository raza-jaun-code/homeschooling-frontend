import { User } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Parent Name",
    email: "parent@example.com",
    phone: "+92 300 0000000",
    city: "Karachi",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const save = (e) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
    // optionally send profile update to API
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#111827] p-3 rounded-full">
          <User className="w-6 h-6 text-indigo-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
          <div className="text-sm text-gray-400">Parent Account</div>
        </div>
      </div>

      <div className="bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl p-6">
        {!editing ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-white mt-1">{profile.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Phone</div>
                <div className="text-white mt-1">{profile.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">City</div>
                <div className="text-white mt-1">{profile.city}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditing(true)} className="relative group px-4 py-2 rounded-lg text-white font-semibold bg-[#1e293b] overflow-hidden">
                <span className="relative z-10">Edit Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none" />
              <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none" />
              <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none" />
              <input name="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none" />
            </div>

            <div className="flex gap-3 mt-4">
              <button type="submit" className="relative group px-4 py-2 rounded-lg text-white font-semibold bg-[#1e293b] overflow-hidden">
                <span className="relative z-10">Save</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </button>
              <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;