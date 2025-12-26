import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[85vh] flex justify-center items-center bg-[#0b0f19] text-white px-4 py-12">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
};

export default Register;
