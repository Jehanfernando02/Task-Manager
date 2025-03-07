import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
  path="/dashboard"
  element={user ? <DashboardPage /> : <Navigate to="/login" />}
/>

      </Routes>
    </Router>
  );
};

export default App;
