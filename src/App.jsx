import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import AddCourse from './pages/AddCourse.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StudentForm from './components/StudentForm.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import AddCourseForm from './pages/AddCourseForm.jsx';
import AssignmentsPage from './pages/AssignmentsPage.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course" element={<AddCourse />} />
      <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<CoursesPage />} />
          <Route path="add-course" element={<AddCourseForm />} />
          <Route path="register-student" element={<StudentForm />} />
          <Route path="courses/:id" element={<AssignmentsPage/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
