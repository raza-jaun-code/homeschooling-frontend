import { BookOpen, FileText, Image, Hash } from "lucide-react";
import { useState } from "react";

const AdminCreateTemplates = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    code: "",
  });

  const [message, setMessage] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle automatic thumbnail upload on file select
  const handleThumbnailSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessage("Uploading thumbnail...");
    setThumbnailName("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        { method: "POST", body: data }
      );

      const uploaded = await res.json();

      if (uploaded.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: uploaded.secure_url,
        }));
        setThumbnailName(file.name);
        setMessage("Thumbnail uploaded successfully!");
      } else {
        setMessage("Failed to upload thumbnail.");
      }
    } catch {
      setMessage("Failed to upload thumbnail.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.title || !formData.code || !formData.description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.thumbnail) {
      setMessage("Thumbnail is required.");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("You must be logged in to create a course.");
      return;
    }

    try {
      const response = await fetch(`${url}api/v1/admin/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.id) {
        setMessage("Course added successfully!");
        setFormData({ title: "", description: "", thumbnail: "", code: "" });
        setThumbnailName("");
      } else {
        setMessage("Failed to add course.");
      }
    } catch {
      setMessage("Failed to add course.");
    }
  };

  return (
    <div className="h-[86vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl p-6 shadow-2xl max-w-2xl w-full"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#111827] p-3 rounded-full">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">Add New Course</h2>
          <p className="text-gray-400 text-sm mt-1 text-center">
            Fill in the details to create a course.
          </p>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success") ? "text-green-400" : "text-red-400"
            } font-medium`}
          >
            {message}
          </p>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Title */}
          <div className="flex items-center bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <BookOpen className="w-5 h-5 text-indigo-400 mr-2" />
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course Title *"
              className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Code */}
          <div className="flex items-center bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <Hash className="w-5 h-5 text-indigo-400 mr-2" />
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Course Code *"
              className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="flex items-start bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 sm:col-span-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <FileText className="w-5 h-5 text-indigo-400 mr-2 mt-1" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course Description *"
              rows="3"
              className="bg-transparent outline-none text-white w-full resize-none placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="flex items-center bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 sm:col-span-2">
            <Image className="w-5 h-5 text-indigo-400 mr-2" />
            <label className="flex-1 text-sm text-gray-400 cursor-pointer">
              {thumbnailName
                ? <span className="text-green-400 font-medium">{thumbnailName}</span>
                : "Select Thumbnail *"}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                className="hidden"
                required={!thumbnailName}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-lg hover:scale-105 transition-transform"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AdminCreateTemplates;