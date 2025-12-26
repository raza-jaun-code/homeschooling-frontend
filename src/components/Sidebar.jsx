import {
  BookOpen,
  Users,
  PlusCircle,
  MessageSquare,
  Bell,
  User,
  Send,
  Menu,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setOpen(false);
      else setOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    // { path: "/dashboard", label: "Dashboard", icon: <BookOpen className="w-5 h-5" /> },
    { path: "/dashboard/", label: "Courses", icon: <BookOpen className="w-5 h-5" /> },
    // { path: "/dashboard/courses/1", label: "Assignments", icon: <PlusCircle className="w-5 h-5" /> },
    // { path: "/dashboard/announcements", label: "Announcements", icon: <Bell className="w-5 h-5" /> },
    // { path: "/dashboard/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { path: "/dashboard/register-student", label: "Register Student", icon: <Users className="w-5 h-5" /> },
    { path: "/dashboard/student-submissions", label: "Student Submissions", icon: <Send className="w-5 h-5" /> }
    // { path: "/dashboard/add-course", label: "Add Course", icon: <PlusCircle className="w-5 h-5" /> },
    // { path: "/dashboard/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Sidebar toggle (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#111827] border border-gray-800 hover:bg-[#1f2937]"
      >
        <Menu className="w-5 h-5 text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col justify-between h-full w-72 bg-[#0b0f19]/95 backdrop-blur-xl border-r border-gray-800 p-4">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-violet-500 p-3 rounded-2xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg">Parent Portal</div>
                  <div className="text-xs text-gray-400">Manage students & courses</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 mt-13">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl relative overflow-hidden font-medium transition-all duration-200
                      ${
                        isActive
                          ? "text-white shadow-md"
                          : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {/* Gradient background for active or hover */}
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500
                        ${isActive ? "opacity-80" : "opacity-0 group-hover:opacity-30"}
                        transition-opacity duration-300`}
                    ></div>

                    <span className="relative z-10">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer (Logout) */}
          <div>
            <Link
              to="/login"
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white 
              bg-[#1e293b] relative group overflow-hidden font-medium shadow-md border border-gray-700 
              hover:shadow-lg hover:text-white transition-all duration-300"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;