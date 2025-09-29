import { useState } from "react";
import { BookOpen, FileText, Image, Hash } from "lucide-react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    thumbnail: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Add New Course</h2>
        </div>
        <p className="text-gray-500 text-center text-sm">
          Fill in the details below to create a new course.
        </p>

        {/* Title & Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <BookOpen size={16} className="text-indigo-500" />
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Hash size={16} className="text-indigo-500" />
              Course Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter course code"
              required
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
            <Image size={16} className="text-indigo-500" />
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
            <FileText size={16} className="text-indigo-500" />
            Course Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short course description..."
            rows="4"
            required
            className="border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 shadow-md transition"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
