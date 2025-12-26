import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ----------------------
// Confirm Delete Dialog
// ----------------------
const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl w-80">
        <h3 className="text-lg font-semibold text-white">Delete Course?</h3>
        <p className="text-gray-300 mt-2">
          Are you sure you want to delete this course?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Update Course Modal
// ----------------------
const UpdateCourseModal = ({ open, course, onClose, onUpdate, url }) => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    thumbnail: "",
  });

  // Pre-fill modal when course changes
  useEffect(() => {
    if (course) {
      setForm({
        title: course.title,
        description: course.description,
        code: course.code,
        thumbnail: course.thumbnail || "",
      });
    }
  }, [course]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${url}api/v1/course/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update course");

      const updated = await res.json();

      onUpdate(updated); // update parent list
      onClose(); // close modal
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-lg shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Update Course</h3>

        {/* Title */}
        <label className="text-gray-300 text-sm">Title</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-[#0f172a] text-white border border-gray-700"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Code */}
        <label className="text-gray-300 text-sm">Course Code</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-[#0f172a] text-white border border-gray-700"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        {/* Description */}
        <label className="text-gray-300 text-sm">Description</label>
        <textarea
          rows={3}
          className="w-full mt-1 mb-3 p-2 rounded bg-[#0f172a] text-white border border-gray-700"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Thumbnail URL */}
        <label className="text-gray-300 text-sm">Thumbnail URL</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-[#0f172a] text-white border border-gray-700"
          value={form.thumbnail}
          onChange={(e) =>
            setForm({ ...form, thumbnail: e.target.value })
          }
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------
// MAIN COMPONENT: CoursesPage
// -----------------------------------------------------
const CoursesPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${url}api/v1/course`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();

        const mapped = data.map((c, index) => ({
          ...c,
          publicId: index + 1,
        }));

        setCourses(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [url]);

  // Delete handler
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${url}api/v1/course/${selectedCourse}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) =>
        prev.filter((c) => c.id !== selectedCourse)
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setShowConfirm(false);
      setSelectedCourse(null);
    }
  };

  // Update handler from modal
  const handleCourseUpdate = (updated) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  if (loading)
    return (
      <div className="text-white text-center mt-10">Loading courses...</div>
    );

  if (error)
    return <div className="text-red-400 text-center mt-10">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Courses</h2>

        <Link
          to="/dashboard/add-course"
          className="relative group inline-flex items-center px-4 py-2 rounded-lg text-white font-semibold bg-[#1e293b]"
        >
          <span className="relative z-10">Add Course</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="group relative bg-[#0f172a]/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <Link
              to={`/dashboard/courses/${c.publicId}`}
              state={{ realId: c.id }}
            >
              {c.thumbnail && (
                <img
                  src={c.thumbnail}
                  className="w-full h-36 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="text-white text-lg font-semibold">{c.title}</h3>
              <p className="text-gray-400 text-sm">Code: {c.code}</p>
              <p className="text-gray-300 mt-2 line-clamp-3">
                {c.description}
              </p>
            </Link>

            {/* Update / Delete */}
            <div className="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => {
                  setSelectedCourse(c);
                  setShowUpdateModal(true);
                }}
                className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white"
              >
                Update
              </button>

              <button
                onClick={() => {
                  setSelectedCourse(c.id);
                  setShowConfirm(true);
                }}
                className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />

      {/* Update Modal */}
      <UpdateCourseModal
        open={showUpdateModal}
        course={selectedCourse}
        onClose={() => setShowUpdateModal(false)}
        onUpdate={handleCourseUpdate}
        url={url}
      />
    </div>
  );
};

export default CoursesPage;