import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6 bg-gradient-to-r from-indigo-50 to-white">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;