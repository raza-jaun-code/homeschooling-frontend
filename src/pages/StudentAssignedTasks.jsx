import React, { useEffect, useState } from 'react';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import StudentHeader from '../components/Header.jsx';

const StudentAssignedTasks = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' }); // { text, type: 'success' | 'error' }

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      const token = localStorage.getItem('studentToken');
      if (!token) return;

      try {
        const res = await fetch(`${url}api/v1/assignment/student/upcoming`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch assignments');
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        console.error(err.message);
        setMessage({ text: 'Failed to load assignments.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Upload PDF to Cloudinary
  const handleFileUpload = async (assignmentId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PDF_PRESET);

    try {
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (cloudData.secure_url) {
        setUploadedFiles((prev) => ({
          ...prev,
          [assignmentId]: { fileName: file.name, fileUrl: cloudData.secure_url },
        }));
        setMessage({ text: 'File uploaded successfully!', type: 'success' });
      } else {
        setMessage({ text: 'File upload failed.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'File upload failed.', type: 'error' });
    }
  };

  // Turn in the assignment
  const handleTurnIn = async (assignmentId) => {
    const fileData = uploadedFiles[assignmentId];
    if (!fileData) return setMessage({ text: 'Please upload a file first.', type: 'error' });

    try {
      const token = localStorage.getItem('studentToken');
      const res = await fetch(`${url}api/v1/submission/${assignmentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ submissionURL: fileData.fileUrl }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setMessage({ text: `Assignment #${assignmentId} submitted successfully!`, type: 'success' });
      // Clear uploaded file
      setUploadedFiles((prev) => {
        const copy = { ...prev };
        delete copy[assignmentId];
        return copy;
      });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Submission failed.', type: 'error' });
    }
  };

  if (loading)
    return <div className="text-white text-center mt-10">Loading assignments...</div>;

  return (
    <div className="space-y-8">
      <StudentHeader title="Current Assigned Tasks" icon={FileText} />

      {/* Message */}
      {message.text && (
        <p
          className={`text-center font-medium ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="grid gap-6">
        {assignments.map((task) => (
          <div
            key={task.id}
            className="bg-[#0f172a]/70 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {/* Assignment Details */}
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-indigo-300 mb-1">
                {task.title || 'Untitled Assignment'}
              </h3>
              <p className="text-gray-300 mb-2">{task.description || 'No description'}</p>
              <p className="text-gray-400">
                Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
              </p>
            </div>

            {/* Upload PDF + Turn In */}
            <div className="flex flex-col items-start md:items-end">
              {!uploadedFiles[task.id] && (
                <label className="relative cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload PDF</span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files.length > 0) handleFileUpload(task.id, e.target.files[0]);
                    }}
                  />
                </label>
              )}

              {uploadedFiles[task.id] && (
                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="text-green-400 flex items-center gap-2">
                    <CheckCircle /> {uploadedFiles[task.id].fileName} uploaded
                  </p>
                  <button
                    onClick={() => handleTurnIn(task.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
                  >
                    Turn In
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">Max file size: 5MB (PDF only)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignedTasks;