import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="flex flex-col gap-6 bg-white p-10 rounded-2xl shadow-lg w-full max-w-md m-4">
      <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>

      {/* First Name */}
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="First Name"
          className="outline-none flex-1"
        />
      </div>

      {/* Last Name */}
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Last Name"
          className="outline-none flex-1"
        />
      </div>

      {/* Username */}
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Username"
          className="outline-none flex-1"
        />
      </div>

      {/* Password */}
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="outline-none flex-1"
        />
      </div>

      {/* Confirm Password */}
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          placeholder="Confirm Password"
          className="outline-none flex-1"
        />
      </div>

      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Register
      </button>

      <p className="text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;