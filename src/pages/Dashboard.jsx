import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;