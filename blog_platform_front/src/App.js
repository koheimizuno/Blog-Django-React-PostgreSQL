import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPostFull from './components/BlogPostFull';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='posts/:postId' element={<BlogPostFull />} />
      </Routes>
        
    </Router>
  );
}

export default App;
