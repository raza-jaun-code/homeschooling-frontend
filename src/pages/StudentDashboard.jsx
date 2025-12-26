import StudentSidebar from "../components/StudentSidebar";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl" />

      <div className="relative z-10 flex">
        <StudentSidebar/>
        <main className="flex-1 p-6 lg:p-10 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
