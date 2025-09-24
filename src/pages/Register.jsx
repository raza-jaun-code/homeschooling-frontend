import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-indigo-50 to-white">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
}

export default Register;