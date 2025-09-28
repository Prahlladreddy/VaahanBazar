// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">BikeMarket</h3>
            <p className="footer-description">
              Your trusted marketplace for new and used two-wheelers.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/compare">Compare</a></li>
              <li><a href="/new">New Bikes</a></li>
              <li><a href="/used">Used Bikes</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="/finance">Finance</a></li>
              <li><a href="/insurance">Insurance</a></li>
              <li><a href="/test-ride">Test Ride</a></li>
              <li><a href="/sell">Sell Your Bike</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <p className="footer-contact">Email: info@bikemarket.com</p>
            <p className="footer-contact">Phone: +91 98765 43210</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BikeMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;