import { useState } from "react";
import { UserPlus } from "lucide-react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering student:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2">
          <UserPlus className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">
            Register New Student
          </h2>
        </div>

        {/* Name fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Passwords */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 shadow-md transition"
        >
          Register Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;