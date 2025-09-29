import { Link } from "react-router-dom";

const CoursesPage = () => {
  // Dummy data for now
  const courses = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      code: "DSA101",
      description: "Master DSA with problems, logic building, and coding challenges.",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            to={`/dashboard/courses/${course.id}`}
            key={course.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-indigo-600">{course.title}</h3>
            <p className="text-sm text-gray-500">Code: {course.code}</p>
            <p className="text-sm text-gray-700 line-clamp-3">{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;