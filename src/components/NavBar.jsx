import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" className="navbar-logo-link">Meeting Scheduler</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/registration"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Register
          </NavLink>
        </li>
        <li>
    <NavLink
      to="/virtual"
      className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
    >
      Virtual meeting
    </NavLink>
  </li>
  
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Scheduler
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
