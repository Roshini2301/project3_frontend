import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Registration from './pages/Registration'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import VirtualMeeting from "./pages/VirtualMeeting";  // Import VirtualMeeting component from the pages folder
import FormBuilder from "./pages/FormBuilder";  // Import FormBuilder (or any other page you're working on)



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/virtual" element={<VirtualMeeting />} />  {/* Home or root route */}
        <Route path="/form" element={<FormBuilder />} />  {/* Redirected page after scheduling a meeting */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
