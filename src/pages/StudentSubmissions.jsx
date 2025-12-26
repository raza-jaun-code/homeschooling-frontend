import React, { useEffect, useState } from 'react';
import { Send, Eye } from 'lucide-react';
import StudentHeader from '../components/Header.jsx';

const StudentSubmissions = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewURL, setPreviewURL] = useState(null); // for modal

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      const token = localStorage.getItem('studentToken');
      if (!token) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${url}api/v1/submission/my-submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch submissions');

        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading submissions...</div>;
  if (error) return <div className="text-red-400 text-center mt-10">{error}</div>;

  return (
    <div className="space-y-8">
      <StudentHeader title="Past Submissions & Grades" icon={Send} />

      <div className="bg-[#0f172a]/70 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="text-gray-400 text-left text-sm font-medium">
                <th className="py-3 px-4">Assignment</th>
                <th className="py-3 px-4 hidden sm:table-cell">Course</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {submissions.map((s) => (
                <tr key={s.id} className="text-gray-200 hover:bg-[#1a2034] transition">
                  <td className="py-4 px-4 font-semibold">{s.assignmentTitle}</td>
                  <td className="py-4 px-4 hidden sm:table-cell text-sm text-gray-400">{s.courseTitle}</td>
                  <td className="py-4 px-4 text-sm">
                    {s.deadline ? new Date(s.deadline).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    {s.submissionURL ? (
                      <button
                        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm"
                        onClick={() => setPreviewURL(s.submissionURL)}
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </button>
                    ) : (
                      'No file'
                    )}
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {previewURL && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] border border-gray-700 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
              <h2 className="text-gray-200 text-lg font-semibold">PDF Preview</h2>

              <button
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                onClick={() => setPreviewURL(null)}
              >
                Close
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-black/20 p-2">
              <iframe
                src={previewURL}
                title="PDF Preview"
                className="w-full h-full rounded-lg border border-gray-600"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSubmissions;