import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Dashboard />
      </div>
    </AuthProvider>
  );
}

export default App;