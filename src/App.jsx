import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewBikes from './pages/NewBikes';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-motorcycle"></i>
              </div>
              <h1>Two-Wheeler Marketplace</h1>
            </div>
            {isAuthenticated && (
              <div className="user-info">
                <span>Welcome, {user?.username}</span>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} logout={logout} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup login={login} />} />
          <Route path="/new-bikes" element={<NewBikes isAuthenticated={isAuthenticated} user={user} logout={logout} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/new-bikes">New Bikes</a>
              <a href="/login">Login</a>
              <a href="/signup">Sign Up</a>
            </div>
            <div className="copyright">
              &copy; {new Date().getFullYear()} Two-Wheeler Marketplace. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;