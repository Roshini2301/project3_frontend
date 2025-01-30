import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming you have custom styles in App.css

const FormBuilder = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const navigate = useNavigate();

  // Retrieve meeting data from localStorage
  useEffect(() => {
    const storedMeetingTitle = localStorage.getItem("meetingTitle");
    const storedMeetingDate = localStorage.getItem("meetingDate");
    const storedVideoLink = localStorage.getItem("videoLink");
    const storedReminderTime = localStorage.getItem("reminderTime");

    if (storedMeetingTitle && storedMeetingDate) {
      setMeetingTitle(storedMeetingTitle);
      setMeetingDate(storedMeetingDate);
      setVideoLink(storedVideoLink);
      setReminderTime(storedReminderTime);
    } else {
      navigate("/");  // Redirect to the main page if no meeting data is found
    }
  }, [navigate]);

  return (
    <div className="form-builder-container">
      <div className="form-container">
        <h1 className="heading">Meeting Details</h1>

        {/* Meeting Title */}
        <div className="input-container">
          <label>Meeting Title:</label>
          <input
            type="text"
            value={meetingTitle}
            readOnly
            className="input-field"
          />
        </div>

        {/* Meeting Date and Time */}
        <div className="input-container">
          <label>Meeting Date and Time:</label>
          <input
            type="text"
            value={meetingDate}
            readOnly
            className="input-field"
          />
        </div>

        {/* Reminder Time */}
        <div className="input-container">
          <label>Reminder Time:</label>
          <input
            type="text"
            value={`${reminderTime} minutes before`}
            readOnly
            className="input-field"
          />
        </div>

        {/* Video Link */}
        <div className="input-container">
          <label>Video Link:</label>
          <input
            type="text"
            value={videoLink}
            readOnly
            className="input-field"
          />
        </div>

        {/* Go Back Button */}
        <button onClick={() => navigate("/")} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
