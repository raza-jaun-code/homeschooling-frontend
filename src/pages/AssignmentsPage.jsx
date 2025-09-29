import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AssignmentsPage = () => {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expiration: "",
  });

  // Dummy fetch for now
  useEffect(() => {
    setAssignments([
      {
        id: 1,
        title: "Math Homework 1",
        description: "Complete algebra problems from Chapter 3.",
        expiration: "2025-10-10",
        createdAt: "2025-09-26",
      },
      {
        id: 2,
        title: "Science Assignment",
        description: "Write a short report on photosynthesis.",
        expiration: "2025-10-15",
        createdAt: "2025-09-27",
      },
    ]);
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments([
      ...assignments,
      {
        id: assignments.length + 1,
        title: formData.title,
        description: formData.description,
        expiration: formData.expiration,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowModal(false);
    setFormData({ title: "", description: "", expiration: "" });
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Assignment
        </button>
      </div>

      {/* Assignments List */}
      {assignments.length === 0 ? (
        <p className="text-gray-600">No assignments yet.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => (
            <details
              key={a.id}
              className="bg-white rounded-lg shadow p-4 cursor-pointer"
            >
              <summary className="font-semibold text-indigo-600">
                {a.title}
              </summary>
              <div className="mt-2 text-gray-700 text-sm">
                <p>
                  <span className="font-semibold">Created:</span> {a.createdAt}
                </p>
                <p>
                  <span className="font-semibold">Expires:</span> {a.expiration}
                </p>
                <p className="mt-2">{a.description}</p>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 transform transition-all scale-95 animate-fadeIn">
            <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
              Add New Assignment
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter assignment title"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter assignment details"
                  required
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;