import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPostFull from './components/BlogPosts/BlogPostFull';
import LogIn from './components/Auth/Login'
import Register from './components/Auth/Register';
import PasswordReset from './components/Auth/PasswordRest';
import PasswordResetConfirmation from './components/Auth/PasswordResetConfirmation';
import DashBoard from './pages/DashBoard';
import PrivateRoutes from './components/Auth/PrivateRoutes';
import {token} from './components/Auth/Token';

function App() {
  const isAuthorized = !!token

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/dashboard/" element={<PrivateRoutes authenticated={isAuthorized} children={<DashBoard />} />} />   
        <Route path='posts/:id' element={<BlogPostFull />} />
        <Route path='register' element={<Register />} />
        <Route path='password_reset' element={<PasswordReset />} />
        <Route path='password_reset_confirm/:uid/:token' element={<PasswordResetConfirmation />} />
        <Route path='login' element={localStorage.getItem('token') ? (<Navigate to="/" />) : (<LogIn />)} />
      </Routes>        
    </Router>
  );
}

export default App;
