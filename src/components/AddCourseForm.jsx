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

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ---------------------------------------
  // CLOUDINARY UPLOAD (Triggered by button)
  // ---------------------------------------
  const handleThumbnailUpload = async () => {
    if (!thumbnailFile) {
      setMessage("Please select an image first.");
      return;
    }

    setMessage("Uploading thumbnail...");

    const data = new FormData();
    data.append("file", thumbnailFile);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();

      if (uploaded.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: uploaded.secure_url,
        }));
        setMessage("Thumbnail uploaded successfully!");
      } else {
        setMessage("Failed to upload thumbnail.");
      }
    } catch {
      setMessage("Failed to upload thumbnail.");
    }
  };

  // ---------------------------------------
  // FORM SUBMISSION
  // ---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.title || !formData.code || !formData.description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.thumbnail) {
      setMessage("Please upload the thumbnail.");
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
        setThumbnailFile(null);
      } else {
        setMessage("Failed to add course");
      }
    } catch {
      setMessage("Failed to add course");
    }
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b0f19]/90 backdrop-blur-lg border border-gray-800 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="bg-[#111827] p-3 rounded-full">
          <BookOpen className="w-6 h-6 text-indigo-300" />
        </div>
        <h2 className="text-2xl font-bold text-white mt-3">Add New Course</h2>
        <p className="text-gray-400 text-sm mt-1">
          Fill in the details below to create a new course.
        </p>
      </div>

      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("success") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="flex items-center bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2">
          <BookOpen className="w-5 h-5 text-indigo-300 mr-3" />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title *"
            className="bg-transparent outline-none text-white w-full"
            required
          />
        </div>

        {/* Code */}
        <div className="flex items-center bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2">
          <Hash className="w-5 h-5 text-indigo-300 mr-3" />
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Course Code *"
            className="bg-transparent outline-none text-white w-full"
            required
          />
        </div>

        {/* Thumbnail File Picker */}
        <div className="bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 sm:col-span-2">
          <div className="flex items-center">
            <Image className="w-5 h-5 text-indigo-300 mr-3" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleThumbnailUpload}
            disabled={!thumbnailFile}
            className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50"
          >
            Upload Thumbnail
          </button>

          {/* Preview */}
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Thumbnail"
              className="mt-3 h-28 rounded-lg border border-gray-700 object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div className="flex items-start bg-[#0f172a] border border-gray-700 rounded-lg px-3 py-2 sm:col-span-2">
          <FileText className="w-5 h-5 text-indigo-300 mr-3 mt-1" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course Description *"
            rows="4"
            className="bg-transparent outline-none text-white w-full resize-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="relative group w-full mt-6 py-3 rounded-lg font-semibold text-white bg-[#1e293b] overflow-hidden"
      >
        <span className="relative z-10">Create Course</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </button>
    </form>
  );
};

export default AddCourseForm;