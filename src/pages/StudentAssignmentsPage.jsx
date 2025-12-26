import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentAssignmentsPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { id: publicCourseId } = useParams(); // 1,2,3 etc.

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("studentToken");
      if (!token) {
        setError("You must be logged in");
        setLoading(false);
        return;
      }

      // Retrieve real DB id
      const realCourseId = localStorage.getItem(`realCourseId_${publicCourseId}`);
      if (!realCourseId) {
        setError("Course not found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${url}api/v1/assignment/student/course/${realCourseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch assignments");

        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [publicCourseId]);

  if (loading) return <div className="text-white text-center mt-10">Loading assignments...</div>;
  if (error) return <div className="text-red-400 text-center mt-10">{error}</div>;

  return (
    <div className="p-6 space-y-6 text-white">
      <h2 className="text-3xl font-bold">Assignments</h2>
      {assignments.length === 0 ? (
        <p className="text-gray-400">No assignments yet.</p>
      ) : (
        assignments.map(a => (
          <div
            key={a.id}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-2xl font-bold">{a.title}</h3>
            <p className="text-gray-300 mt-2">{a.description}</p>
            <p className="text-gray-400 mt-1">
              Deadline: {new Date(a.deadline).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentAssignmentsPage;
