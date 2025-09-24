import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-6 bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800">Login to HomeSchooling App</h2>
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <Mail className="w-5 h-5 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="outline-none flex-1"
        />
      </div>
      <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
        <Lock className="w-5 h-5 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="outline-none flex-1"
        />
      </div>
      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Login
      </button>
      <p className="text-sm text-gray-600 text-center">
        Don’t have an account? <Link to="/register" className="text-indigo-600">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginForm;