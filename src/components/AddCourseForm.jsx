import { BookOpen, FileText, Image, Hash } from "lucide-react";
import { useState } from "react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    code: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Submitted:", formData);
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
            placeholder="Course Title"
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
            placeholder="Course Code"
            className="flex-1 outline-none text-gray-700"
            required
          />
        </div>

        {/* Thumbnail */}
        <div className="flex items-center border rounded-lg px-4 py-3 gap-2 sm:col-span-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <Image className="w-5 h-5 text-indigo-500" />
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="flex-1 outline-none text-gray-700"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start border rounded-lg px-4 py-3 gap-2 sm:col-span-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
          <FileText className="w-5 h-5 text-indigo-500 mt-1" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description"
            rows="4"
            className="flex-1 outline-none text-gray-700 resize-none"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
        Create Course
      </button>
    </form>
  );
};

export default AddCourseForm;
