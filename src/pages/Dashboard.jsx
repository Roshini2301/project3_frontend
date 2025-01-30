import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [reminderTime, setReminderTime] = useState(15);
  const [videoPlatform, setVideoPlatform] = useState("zoom");

  // Fetch meetings from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/meetings")
      .then((response) => setMeetings(response.data))
      .catch((error) => console.error("Error fetching meetings:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMeeting = { meetingTitle, meetingDate, reminderTime, videoPlatform };

    try {
      const response = await axios.post("http://localhost:8000/api/meetings/schedule", newMeeting);
      setMeetings([...meetings, response.data]);
      setMeetingTitle("");
      setMeetingDate("");
      setReminderTime(15);
      setVideoPlatform("zoom");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Scheduler</h2>
      <p>Manage your meetings here.</p>

      <div className="meeting-form">
        <h3>Book a New Meeting</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            required
          />
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />
          <select value={videoPlatform} onChange={(e) => setVideoPlatform(e.target.value)}>
            <option value="zoom">Zoom</option>
            <option value="googleMeet">Google Meet</option>
          </select>
          <button type="submit">Book Meeting</button>
        </form>
      </div>

      <div className="meeting-list">
        <h3>Upcoming Meetings</h3>
        {meetings.length === 0 ? (
          <p>No upcoming meetings.</p>
        ) : (
          <ul>
            {meetings.map((meeting) => (
              <li key={meeting._id}>
                <strong>{meeting.meetingTitle}</strong> - {new Date(meeting.meetingDate).toLocaleString()}
                <br />
                <em>Platform:</em> {meeting.videoPlatform}
                <br />
                <a href={meeting.videoLink} target="_blank" rel="noopener noreferrer">Join Meeting</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
