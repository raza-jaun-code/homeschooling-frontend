import { UserPlus } from "lucide-react";
import { useState } from "react";

const StudentForm = () => {
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const url = import.meta.env.VITE_BACKEND_URL;

const handleChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!formData.firstName || !formData.lastName || !formData.username) {
    setError("Please fill all required fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  // 🔥 Get parent JWT token
  const token = localStorage.getItem("token");
  if (!token) {
    setError("You must be logged in as a parent to register a student.");
    return;
  }

  try {
    const response = await fetch(`${url}api/v1/parent/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 Add token here
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed.");
      return;
    }

    setSuccess("Student registered successfully!");

    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  } catch (err) {
    setError("Something went wrong. Please try again.");
  }
};

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#111827] p-3 rounded-full">
            <UserPlus className="w-6 h-6 text-indigo-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">Register New Student</h2>
          <p className="text-gray-400 text-sm mt-1">Create a student account for your child.</p>
        </div>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        {success && (
          <p className="text-green-400 text-center mb-4 font-medium">{success}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none sm:col-span-2"
            required
          />

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none"
            required
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="relative group w-full mt-6 py-3 rounded-lg font-semibold text-white bg-[#1e293b] overflow-hidden"
        >
          <span className="relative z-10">Register Student</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </button>
      </form>
    </div>
  );
};

export default StudentForm;