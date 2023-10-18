import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPostFull from './components/BlogPostFull';
import LogIn from './components/Auth/LogIn'
import LogOut from './components/Auth/LogOut';
import Register from './components/Auth/Register';
import PasswordReset from './components/Auth/PasswordRest';
import PasswordResetConfirmation from './components/Auth/PasswordResetConfirmation';
// import ProtectedRoute from './components/Auth/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path="dashboard" element={<ProtectedRoute component={Dashboard} />} /> */}
        <Route path='posts/:id' element={<BlogPostFull />} />
        <Route path='register' element={<Register />} />
        <Route path='password_reset' element={<PasswordReset />} />
        <Route path='password_reset_confirm/:uid/:token' element={<PasswordResetConfirmation />} />
        <Route path='login' element={localStorage.getItem('token') ? (<Navigate to="/" />) : (<LogIn />)} />
        <Route path='logout' element={<LogOut />} />
      </Routes>        
    </Router>
  );
}

export default App;
