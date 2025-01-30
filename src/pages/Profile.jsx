import React from 'react';
import '../App.css'; // Ensure the correct path to App.css

const Profile = () => {
  const user = {
    name: "Roshini M",
    email: "roshini2006@gmail.com",
    role: "Admin",
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button className="btn-primary">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
