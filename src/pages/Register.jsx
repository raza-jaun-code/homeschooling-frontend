import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6 bg-gradient-to-r from-indigo-50 to-white">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
};

export default Register;