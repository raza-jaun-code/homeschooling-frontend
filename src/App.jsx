import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import AddCourse from './pages/AddCourse.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course" element={<AddCourse />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
