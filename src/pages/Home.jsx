// src/pages/Home.js
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <div className="home-container">
        <h1>Welcome to the Meeting Scheduler</h1>
        <p>This App makes you to Book and manage your meetings easily.</p>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
}

export default Home;
