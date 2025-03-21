import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import Login from './components/Auth/Login'; // Import Login explicitly

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-secondary dark:bg-darkBg">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} /> {/* Explicit login route */}
              <Route path="/board/:boardId" element={<BoardPage />} />
              <Route path="*" element={<div className="text-center mt-20 text-2xl text-gray-600 dark:text-gray-300">404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;