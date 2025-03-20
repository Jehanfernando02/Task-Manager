import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  console.log('App.jsx: Rendering');
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-secondary dark:bg-darkBg">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/board/:boardId"
                element={
                  <ProtectedRoute>
                    <BoardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;