import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
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
      setError("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch(`${url}api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const text = await response.text(); // backend sends string (token or "unsuccessful")

      if (text && text !== "unsuccessful") {
        localStorage.setItem("token", text);
        navigate("/course");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 sm:gap-6 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md mx-auto"
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
        Login to HomeSchooling App
      </h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Username Input */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <Mail className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Password Input */}
      <div className="flex items-center border rounded-lg px-3 sm:px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="outline-none flex-1 text-sm sm:text-base"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base font-medium"
      >
        Login
      </button>

      {/* Redirect Text */}
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;