import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  console.log('App.jsx: Rendering App component');

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-secondary dark:bg-darkBg">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1 className="text-2xl font-bold mb-4">Welcome to Trello Clone</h1>
                    <Home />
                  </>
                }
              />
              <Route
                path="/board/:boardId"
                element={
                  <ProtectedRoute>
                    <BoardPage />
                  </ProtectedRoute>
                }
              />
              {/* Fallback route for debugging */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>

          {/* Debug Footer */}
          <footer className="text-center p-2 text-gray-500">
            Debug: App is running
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;