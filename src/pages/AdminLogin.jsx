import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminLoginForm from "../components/AdminLoginForm";

const AdminLogin = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6 bg-[#0b0f19]">
        <AdminLoginForm/>
      </main>
      <Footer />
    </>
  );
};

export default AdminLogin;