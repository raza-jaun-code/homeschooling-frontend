import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentLoginForm from "../components/StudentLoginForm";

const StudentLogin = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6 bg-[#0b0f19]">
        <StudentLoginForm />
      </main>
      <Footer />
    </>
  );
};

export default StudentLogin;