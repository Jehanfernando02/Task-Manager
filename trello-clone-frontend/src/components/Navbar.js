import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">TaskFlow</h1>
      <div className="navbar-actions">
        {user ? (
          <div className="user-info">
            <span>{user.displayName}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <button onClick={login} className="login-btn">Sign In with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;