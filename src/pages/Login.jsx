import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "../App.css"; // Assuming you have custom styles in App.css

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added state for password
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) { // Check for password
      alert("Please enter a valid username, email, and password!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        username,
        email,
        password, // Include password in the login request
      });

      if (response.status === 200) {
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);

        alert("Login successful!");
        navigate("/form-builder"); // Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="login-container"> {/* Main container */}
        <h1 className="login-heading">Login</h1> {/* Heading */}

        {/* Username Input */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Email Input */}
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <input
            type="password" // Changed to password field
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
