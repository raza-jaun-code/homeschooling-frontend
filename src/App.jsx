import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";

// Parent Portal (already existed)
import AddCourse from "./pages/AddCourse.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import AddCourseForm from "./pages/AddCourseForm.jsx";
import AssignmentsPage from "./pages/AssignmentsPage.jsx";
import Announcements from "./components/Announcements.jsx";
import Profile from "./components/Profile.jsx";
import Messages from "./components/Messages.jsx";

// ✅ Student Portal (your 5 pages — inside ./pages/)
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentCourses from "./pages/StudentCourses.jsx";
import StudentAssignmentsPage from "./pages/StudentAssignmentsPage.jsx";
import StudentAssignedTasks from "./pages/StudentAssignedTasks.jsx";
import StudentSubmissions from "./pages/StudentSubmissions.jsx";
import StudentProgress from "./pages/StudentProgress.jsx";
import AdminManageUsers from "./pages/AdminManagerUsers.jsx";
import AdminCreateTemplates from "./pages/AdminCreateTemplates.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import ParentSubmissionsPage from "./pages/ParentSubmissionPage.jsx";

function App() {
  return (
    <>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/login" element={<StudentLogin/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />

        {/* ------------------------------- */}
        {/* 📌 Parent Portal (UNCHANGED) */}
        {/* ------------------------------- */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<CoursesPage />} />
          <Route path="student-submissions" element={<ParentSubmissionsPage/>}/>
          <Route path="add-course" element={<AddCourseForm />} />
          <Route path="register-student" element={<StudentForm />} />
          <Route path="courses/:id" element={<AssignmentsPage />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* ------------------------------- */}
        {/* 🎓 Student Portal (NEW) */}
        {/* ------------------------------- */}
        <Route path="/dashboard/student" element={<StudentDashboard />}>
          <Route path="" element={<StudentCourses />} />
          <Route path="course/:id" element={<StudentAssignmentsPage />} />
          <Route path="tasks" element={<StudentAssignedTasks />} />
          <Route path="submissions" element={<StudentSubmissions />} />
          <Route path="progress" element={<StudentProgress />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route path="" element={<AdminCreateTemplates />} />
          <Route path="manage-users" element={<AdminManageUsers />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
