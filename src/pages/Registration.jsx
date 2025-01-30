import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming you have custom styles in App.css

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, role: "User" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful!");
      navigate("/form-builder");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Registration">
      <div className="registration-container"> {/* Main container */}
        <h1 className="registration-heading">Register</h1> {/* Heading */}

        {error && <p className="error-message">{error}</p>}

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
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Register Button */}
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
