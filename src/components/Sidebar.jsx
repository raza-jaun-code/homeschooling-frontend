import { BookOpen, Users, PlusCircle, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "My Courses", icon: <BookOpen size={20} /> },
    { path: "/dashboard/register-student", label: "Register Student", icon: <Users size={20} /> },
    { path: "/dashboard/add-course", label: "Add Course", icon: <PlusCircle size={20} /> },
  ];

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center p-4 shadow bg-white sticky top-0 z-50">
        <h2 className="text-xl font-bold text-indigo-600">Parent Portal</h2>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-indigo-100 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar / Drawer */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col justify-between transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <h2 className="text-2xl font-bold text-indigo-600 hidden md:block">
            Parent Portal
          </h2>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={() => setOpen(false)} // close on mobile click
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout Placeholder */}
        <div className="border-t pt-4 text-sm text-gray-500">
          <p className="text-center">© 2025 HomeSchooling</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;