import { BookOpen, FileText, Image, Hash } from "lucide-react";
import { useState } from "react";

const AddCourseForm = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    code: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.title || !formData.code || !formData.description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create a course.");
      return;
    }

    try {
      const response = await fetch(`${url}api/v1/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.id) {
        setMessage("Course added successfully");
        setFormData({
          title: "",
          description: "",
          thumbnail: "",
          code: "",
        });
      } else {
        setMessage("Failed to add course");
      }
    } catch (err) {
      setMessage("Failed to add course");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-2xl p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col gap-6 mt-4 mb-4"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
        Add New Course
      </h2>
      <p className="text-gray-500 text-center text-sm sm:text-base">
        Fill in the details below to create a new course.
      </p>

      {message && (
        <p
          className={`text-center font-medium ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Grid for inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex items-center border rounded-lg px-4 py-3 gap-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title *"
            className="flex-1 outline-none text-gray-700"
            required
          />
        </div>

        {/* Course Code */}
        <div className="flex items-center border rounded-lg px-4 py-3 gap-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <Hash className="w-5 h-5 text-indigo-500" />
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Course Code *"
            className="flex-1 outline-none text-gray-700"
            required
          />
        </div>

        {/* Thumbnail (optional) */}
        <div className="flex items-center border rounded-lg px-4 py-3 gap-2 sm:col-span-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <Image className="w-5 h-5 text-indigo-500" />
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL (optional)"
            className="flex-1 outline-none text-gray-700"
          />
        </div>

        {/* Description */}
        <div className="flex items-start border rounded-lg px-4 py-3 gap-2 sm:col-span-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <FileText className="w-5 h-5 text-indigo-500 mt-1" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description *"
            rows="4"
            className="flex-1 outline-none text-gray-700 resize-none"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
      >
        Create Course
      </button>
    </form>
  );
};

export default AddCourseForm;