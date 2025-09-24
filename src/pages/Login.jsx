import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-r from-indigo-50 to-white">
        <LoginForm />
      </div>
      <Footer />
    </>
  );
}

export default Login;