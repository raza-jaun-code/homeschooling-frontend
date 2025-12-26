import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import StudentHeader from "../components/Header.jsx";

const StudentCourses = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const token = localStorage.getItem("studentToken");
      if (!token) return;

      try {
        const res = await fetch(`${url}api/v1/course/student`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();

        // Assign publicId (1,2,3...) for URL
        const mapped = data.map((c, index) => ({ ...c, publicId: index + 1 }));
        // Save mapping: publicId → real DB id
        mapped.forEach(c => localStorage.setItem(`realCourseId_${c.publicId}`, c.id));

        setCourses(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [url]);

  if (loading) return <div className="text-white text-center mt-10">Loading courses...</div>;

  return (
    <div className="space-y-8">
      <StudentHeader title="All Courses" icon={BookOpen} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link
            key={course.id}
            to={`/dashboard/student/course/${course.publicId}`}
          >
            <div className="bg-[#0f172a]/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-indigo-500/20 transition duration-300">
              <h3 className="text-xl font-bold text-indigo-300 mb-2">{course.title}</h3>
              <p className="text-gray-300 mb-4">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;