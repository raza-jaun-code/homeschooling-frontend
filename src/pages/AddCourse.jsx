import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddCourseForm from "../components/AddCourseForm";

const AddCourse = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6 bg-[#0b0f19]">
        <div className="w-full max-w-3xl p-6">
          <AddCourseForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AddCourse;