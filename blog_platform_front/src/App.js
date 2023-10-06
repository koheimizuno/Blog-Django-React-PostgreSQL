import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPostFull from './components/BlogPostFull';
import LogIn from './components/Auth/LogIn'
import LogOut from './components/Auth/LogOut';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='posts/:id' element={<BlogPostFull />} />
        <Route path='login' element={<LogIn />} />
        <Route path='logout' element={<LogOut />} />
      </Routes>        
    </Router>
  );
}

export default App;
