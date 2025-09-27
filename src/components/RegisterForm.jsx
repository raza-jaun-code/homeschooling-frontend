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

    // validation
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
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 sm:gap-6 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md mx-auto m-4"
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
        Create an Account
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* First Name */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name *"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Last Name (optional) */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="outline-none flex-1 text-sm sm:text-base"
        />
      </div>

      {/* Username */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username *"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Password */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password *"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password *"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base font-medium"
      >
        Register
      </button>

      {/* Redirect to Login */}
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;