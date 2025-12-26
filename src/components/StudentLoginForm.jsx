import { useState } from "react";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StudentLoginForm = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      const response = await fetch(`${url}api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: "ROLE_STUDENT"
        }),
      });

      const text = await response.text();

      if (text && text !== "unsuccessful") {
        localStorage.setItem("studentToken", text);
        navigate("/dashboard/student");
      } else {
        setError("Invalid student credentials.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl mt-40 mb-10 p-10 relative overflow-hidden">

      {/* Soft background overlay — SAME AS ORIGINAL */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-blue-800/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />

      <h2 className="relative text-4xl font-bold text-center text-white mb-8 tracking-tight">
        Student Login
      </h2>

      {error && (
        <p className="text-red-400 text-center mb-6 font-medium relative">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-8">

        <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <User className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="username"
            placeholder="Username *"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-transparent text-gray-100 outline-none"
          />
        </div>

        <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <Lock className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent text-gray-100 outline-none"
          />
        </div>

        <div className="relative group">
          <button
            type="submit"
            className="relative w-full py-3.5 font-semibold text-white rounded-lg bg-[#1e293b] overflow-hidden transition-colors"
          >
            <span className="relative z-10">Login</span>

            {/* Gradient hover — SAME AS ORIGINAL */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </button>
        </div>

      </form>

      <p className="relative text-center text-gray-400 text-sm mt-8">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-400 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default StudentLoginForm;