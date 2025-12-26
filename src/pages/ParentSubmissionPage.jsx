import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const ParentSubmissionsPage = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewURL, setPreviewURL] = useState(null);
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  // Fetch all submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${url}api/v1/submission/all-submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch submissions");
      const data = await res.json();
      console.log(data);
      setSubmissions(data); // Make sure backend returns array of submissions
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleMarksChange = (submissionId, value) => {
    setMarks((prev) => ({ ...prev, [submissionId]: value }));
  };

  const submitMarks = async (submissionId) => {
    const markValue = marks[submissionId];
    if (!markValue) {
      setMessage("Please select marks before submitting");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${url}api/v1/marks/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          marks: Number(markValue),
          submission: { id: submissionId },
        }),
      });

      if (!res.ok) throw new Error("Failed to assign marks");

      setMessage(`Marks ${markValue} assigned successfully!`);
      fetchSubmissions(); // Refresh the list
    } catch (err) {
      console.error(err);
      setMessage("Error assigning marks");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading submissions...</p>;

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Student Submissions</h1>

      {message && (
        <p className="text-center text-green-400 mb-4 font-medium">{message}</p>
      )}

      <div className="space-y-4">
        {submissions.map((s) => (
          <div
            key={s.id}
            className="bg-gray-800 p-5 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            {/* Details */}
            <div className="flex-1 space-y-1">
              <p className="text-gray-400 text-sm">
                Student: {s.student?.appUsers?.firstName || s.student?.appUsers?.username}{" "}
                {s.student?.appUsers?.lastName || ""}
              </p>
              <p className="font-semibold text-lg">{s.assignment?.title}</p>
              {s.submissionURL && (
                <button
                  className="flex items-center gap-1 text-indigo-400 text-sm mt-1 cursor-pointer"
                  onClick={() => setPreviewURL(s.submissionURL)}
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
              )}
            </div>

            {/* Marks */}
            <div className="flex items-center gap-2 flex-wrap">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleMarksChange(s.id, i + 1)}
                  className={`px-3 py-1 rounded transition-colors duration-200 ${
                    marks[s.id] === i + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => submitMarks(s.id)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded ml-2"
              >
                Done
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewURL && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-3xl h-3/4 p-4 relative">
            <button
              className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              onClick={() => setPreviewURL(null)}
            >
              Close
            </button>
            <iframe
              src={previewURL}
              title="Preview"
              className="w-full h-full border rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentSubmissionsPage;