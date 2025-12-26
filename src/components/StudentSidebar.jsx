import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Send, TrendingUp, Menu, X, GraduationCap, FileText, LogOut } from 'lucide-react';

const StudentSidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const navItems = [
        { label: "All Courses", icon: BookOpen, to: "/dashboard/student" },
        { label: "Assigned Tasks", icon: FileText, to: "/dashboard/student/tasks" },
        { label: "Past Submissions", icon: Send, to: "/dashboard/student/submissions" },
        { label: "Progress Tracking", icon: TrendingUp, to: "/dashboard/student/progress" },
    ];

    const commonClasses = "flex items-center p-3 rounded-xl transition-all duration-200 group";

    const handleLogout = () => {
        localStorage.removeItem("studentToken");
        navigate("/student/login");
        if (isSidebarOpen) toggleSidebar(false); // optional: close sidebar on logout
    };

    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-indigo-600 text-white shadow-lg"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => toggleSidebar(false)}
                ></div>
            )}

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0d121c] border-r border-gray-800 p-4 transition-transform duration-300 z-40 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8 p-2">
                        <GraduationCap className="w-8 h-8 text-indigo-400" />
                        <div>
                            <div className="text-lg font-extrabold text-white">
                                Student Portal
                            </div>
                            <div className="text-xs text-gray-400">Manage submissions</div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        {navItems.map(({ label, icon: Icon, to }) => (
                            <NavLink
                                end
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `${commonClasses} ${
                                        isActive
                                            ? "bg-indigo-700 text-white shadow-lg border border-indigo-500"
                                            : "text-gray-400 hover:bg-[#1c2438] hover:text-white"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{label}</span>
                            </NavLink>
                        ))}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className={`${commonClasses} text-red-500 hover:bg-[#1c2438] hover:text-red-400 w-full`}
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default StudentSidebar;