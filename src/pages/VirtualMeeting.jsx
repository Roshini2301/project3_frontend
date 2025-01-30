import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios'; // Import axios for making API requests
import "../App.css"; // Assuming you have custom styles in App.css

const VirtualMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [reminderTime, setReminderTime] = useState("15"); // 15 minutes reminder
  const [videoPlatform, setVideoPlatform] = useState("zoom"); // Default to Zoom
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();

  // Function to generate video conference link based on selected platform
  const generateVideoLink = (platform) => {
    const meetingId = Math.floor(Math.random() * 1000000000); // Random meeting ID
    if (platform === "zoom") {
      return `https://zoom.us/j/${meetingId}`;
    } else if (platform === "googleMeet") {
      return `https://meet.google.com/${meetingId}`;
    } else {
      return "";
    }
  };

  // Set video link on platform change
  useEffect(() => {
    const link = generateVideoLink(videoPlatform);
    setVideoLink(link);
  }, [videoPlatform]);

  // Handle meeting reminder based on the selected reminder time
  useEffect(() => {
    if (meetingDate) {
      const reminderTimeInMillis = parseInt(reminderTime) * 60 * 1000; // Convert minutes to milliseconds
      const meetingTime = new Date(meetingDate).getTime();
      const timeDifference = meetingTime - reminderTimeInMillis - Date.now();

      if (timeDifference > 0) {
        const reminderTimeout = setTimeout(() => {
          toast.info(`Reminder: Your meeting "${meetingTitle}" is coming up soon!`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000, // Show for 5 seconds
          });
        }, timeDifference);
        return () => clearTimeout(reminderTimeout); // Cleanup on re-render
      }
    }
  }, [meetingDate, reminderTime, meetingTitle]);

  // Handle the form submission (e.g., save meeting and redirect)
  const handleSubmit = async () => {
    if (meetingTitle && meetingDate) {
      try {
        const meetingData = {
          title: meetingTitle,
          date: new Date(meetingDate),
          time: new Date(meetingDate).toLocaleTimeString(),
          location: videoLink, // Assuming the video platform link is the location
          description: `Meeting link: ${videoLink}`,
        };

        // Send a POST request to the backend to save the meeting
        const response = await axios.post("http://localhost:8000/api/meetings/dashboard", meetingData);
        
        // Notify the user that the meeting has been successfully scheduled
        toast.success('Meeting scheduled successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });

        // Navigate to the form-builder page after successfully scheduling
        navigate("/form-builder");
      } catch (error) {
        // Handle error
        toast.error('Error scheduling the meeting. Please try again!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        console.error(error);
      }
    } else {
      toast.error("Please fill in all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="virtual-meeting-container">
      <div className="meeting-container">
        <h1 className="heading">Schedule a Virtual Meeting</h1>

        {/* Meeting Title */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Meeting Date and Time */}
        <div className="input-container">
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Reminder Time */}
        <div className="input-container">
          <select
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="input-field"
          >
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
            <option value="120">2 hours before</option>
          </select>
        </div>

        {/* Video Platform */}
        <div className="input-container">
          <select
            value={videoPlatform}
            onChange={(e) => setVideoPlatform(e.target.value)}
            className="input-field"
          >
            <option value="zoom">Zoom</option>
            <option value="googleMeet">Google Meet</option>
          </select>
        </div>

        {/* Display Video Link */}
        <div className="input-container">
          <input
            type="text"
            value={videoLink}
            readOnly
            className="input-field"
            placeholder="Video Link"
          />
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="submit-button">
          Schedule Meeting
        </button>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default VirtualMeeting;
