import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, Code, Crown, Menu, X, LogOut } from 'lucide-react';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const navItems = [
        { label: "Create Course Templates", icon: Code, to: "/dashboard/admin" },
        { label: "Manage Users", icon: Users, to: "/dashboard/admin/manage-users" },
    ];

    const commonClasses = "flex items-center p-3 rounded-xl transition-all duration-200 group";

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        if (isSidebarOpen) toggleSidebar(false); // optional: close sidebar on mobile
    };

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-pink-600 text-white shadow-lg"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => toggleSidebar(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#140d1c] border-r border-gray-700 p-4 transition-transform duration-300 z-40 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8 p-2">
                        <Crown className="w-8 h-8 text-pink-400" />
                        <div>
                            <div className="text-lg font-extrabold text-white tracking-wide">
                                Admin Panel
                            </div>
                            <div className="text-xs text-gray-400">
                                Manage platform settings
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        {navItems.map(({ label, icon: Icon, to }) => (
                            <NavLink
                                end
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `${commonClasses} ${
                                        isActive
                                            ? "bg-pink-700 text-white shadow-lg border border-pink-500"
                                            : "text-gray-400 hover:bg-[#2c1c38] hover:text-white"
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
                            className={`${commonClasses} text-red-500 hover:bg-[#2c1c38] hover:text-red-400 w-full`}
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

export default AdminSidebar;