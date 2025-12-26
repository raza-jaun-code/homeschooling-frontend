import { useState } from "react";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName || !formData.username || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${url}api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName || null,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.id) {
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl mt-25 p-10 relative overflow-hidden">
      {/* Decorative glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-blue-800/10 to-transparent opacity-50 rounded-3xl pointer-events-none" />

      <h2 className="relative text-4xl font-bold text-center text-white mb-8 tracking-tight">
        Create Your Account
      </h2>

      {error && (
        <p className="text-red-400 text-center mb-6 font-medium relative">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-8">

        {/* Username */}
        <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <User className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username *"
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
          />
        </div>

        {/* Row 1: First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <User className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name *"
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
            />
          </div>

          <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <User className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
            />
          </div>
        </div>
        
        {/* Row 2: Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password *"
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
            />
          </div>

          <div className="flex items-center bg-[#1a1f2e] border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password *"
              className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Register Button */}
        <div className="relative group mt-6">
          <button
            type="submit"
            className="relative w-full py-3.5 font-semibold text-white rounded-lg bg-[#1e293b] overflow-hidden transition-colors"
          >
            <span className="relative z-10">Register</span>
            {/* Gradient Hover Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </button>
        </div>
      </form>

      <p className="relative text-center text-gray-400 text-sm mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;