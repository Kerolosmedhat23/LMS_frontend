import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/pages/home.jsx'
import Courses from '../components/pages/courses.jsx'
import Details from '../components/pages/details.jsx'
import AboutUs from '../components/common/aboutus.jsx'
import Register from '../components/pages/register.jsx'
import Checkout from '../components/pages/checkout.jsx'
import EnrolledCourse from '../components/pages/account/enrolledcourse.jsx' 
import Login from '../components/pages/login.jsx'
import MyCourses from '../components/pages/account/mycourses.jsx' 
import WatchCourse from '../components/pages/account/watchcourse.jsx'
import ChangePassword from '../components/pages/account/changepassword.jsx' 
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'



function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course/:id" element={<Details />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/account/register" element={<Register />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/account/checkout" element={<ProtectedRoute element={<Checkout />} />} />
      <Route path="/account/enrolledcourse" element={<ProtectedRoute element={<EnrolledCourse />} />} />
      <Route path="/account/mycourses" element={<ProtectedRoute element={<MyCourses />} />} />
      <Route path="/account/watchcourse" element={<ProtectedRoute element={<WatchCourse />} />} />
      <Route path="/account/changepassword" element={<ProtectedRoute element={<ChangePassword />} />} />

      </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )}



export default App
