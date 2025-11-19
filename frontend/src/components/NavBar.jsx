import React, { useState } from 'react';
import "../style/NavBarCSS.css";
import { Link } from 'react-router-dom';
export default function NavBar({ username = "Divine" }) {
  const initial = username.charAt(0).toUpperCase();
  const [user] = useState({ name: 'User' }); // Replace with actual user data
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">HawkShield</div>
          <ul className="nav-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
          <div className="user-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </nav>
      </div>
  );
}
