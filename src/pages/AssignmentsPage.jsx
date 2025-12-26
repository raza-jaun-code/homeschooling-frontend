import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

// ----------------------
// Confirm Delete Dialog
// ----------------------
const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm border border-gray-700">
        <h3 className="text-xl text-white font-semibold">Delete Assignment?</h3>
        <p className="text-gray-300 mt-2">
          Are you sure you want to delete this assignment?
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-600 rounded hover:bg-red-500 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Main Component
// ----------------------
const AssignmentsPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { id: publicCourseId } = useParams();
  const location = useLocation();
  const stateRealId = location.state?.realId;
  const [realCourseId, setRealCourseId] = useState(null);

  useEffect(() => {
    if (stateRealId) {
      localStorage.setItem("realCourseId_" + publicCourseId, stateRealId);
      setRealCourseId(stateRealId);
    } else {
      const saved = localStorage.getItem("realCourseId_" + publicCourseId);
      if (saved) setRealCourseId(saved);
    }
  }, [stateRealId, publicCourseId]);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const fetchAssignments = async () => {
    if (!realCourseId) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${url}api/v1/assignment/course/${realCourseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [realCourseId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !realCourseId) return;

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline + "T00:00:00",
        courseId: Number(realCourseId),
      };
      const res = await fetch(`${url}api/v1/assignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add assignment");

      const saved = await res.json();
      setAssignments((prev) => [...prev, saved]);
      setShowAddModal(false);
      setFormData({ title: "", description: "", deadline: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const openUpdate = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      deadline: assignment.deadline.split("T")[0],
    });
    setShowUpdateModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${url}api/v1/assignment/${selectedAssignment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline + "T00:00:00",
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      setAssignments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      setShowUpdateModal(false);
      setSelectedAssignment(null);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedAssignment) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${url}api/v1/assignment/${selectedAssignment.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setAssignments((prev) => prev.filter((a) => a.id !== selectedAssignment.id));
      setShowDeleteDialog(false);
      setSelectedAssignment(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-300 mt-10 text-center">Loading...</p>;

  return (
    <div className="p-6 text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          + Add Assignment
        </button>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((a) => (
          <div key={a.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold">{a.title}</h3>
              <p className="text-gray-300 mt-2">{a.description}</p>
              <p className="text-gray-400 mt-1">
                Deadline: {new Date(a.deadline).toLocaleDateString()}
              </p>
            </div>

            {/* Update/Delete Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => openUpdate(a)}
                className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-500 transition"
              >
                Update
              </button>
              <button
                onClick={() => confirmDelete(a)}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Add Assignment</h2>
            <form className="space-y-3" onSubmit={handleAdd}>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-green-600 rounded hover:bg-green-500 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Update Assignment</h2>
            <form className="space-y-3" onSubmit={handleUpdate}>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                required
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-green-600 rounded hover:bg-green-500 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AssignmentsPage;