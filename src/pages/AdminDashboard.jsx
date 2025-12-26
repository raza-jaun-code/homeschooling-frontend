import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200">
      
      {/* Subtle gradient background like StudentDashboard */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-transparent blur-3xl" />

      <div className="relative z-10 flex">
        
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main content outlet */}
        <main className="flex-1 p-6 lg:p-10 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;