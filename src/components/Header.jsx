// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🏍️</span>
          <span className="logo-text">BikeMarket</span>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/compare" className="nav-link">Compare</Link>
          <Link to="/new" className="nav-link">New Bikes</Link>
          <Link to="/used" className="nav-link">Used Bikes</Link>
        </nav>
        
        <div className="header-actions">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;