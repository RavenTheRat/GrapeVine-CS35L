import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'
import axios from "axios";

function DaySummary( {selectedDay} ) {
  if (!selectedDay) {
    return <div className="day-summary">Loading date...</div>;
  }

  const [events, setEvents] = useState([]);
  const [friendEvents, setFriendEvents] = useState([]);

  // copied from calendar; easier to request events here rather than passing them in for the purpose
  // of labeling friends' events
  useEffect(() => {
    const loadEvents = async () => {
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data);
    }
    
    const loadFriendEvents = async () => {
      const friendResponse = await axios.get("http://localhost:3000/events/friends");
      setFriendEvents(friendResponse.data);
    }
  loadEvents();
  loadFriendEvents();
  }, []);

  const pad = (num) => num.toString().padStart(2, "0");
  const dateToDisplay = `${selectedDay.getFullYear()}-${pad(selectedDay.getMonth() + 1)}-${pad(selectedDay.getDate())}`;

  const todayEvents = events.filter(
    (event) => event.startDt.slice(0, 10) === dateToDisplay);

  const todayFriendEvents = friendEvents.filter(
    (event) => event.startDt.slice(0, 10) === dateToDisplay);

    return (
        <div className = "day-summary">
            <header className = "day-summary-header">
                {selectedDay.toDateString()} — Events:
            </header> 

            <div className = "day-summary-body">
                {todayEvents.length === 0 && todayFriendEvents.length === 0 ? (
          <p>Nothing to see here!</p>
        ) : (
          <div className="day-summary-list">
            {todayEvents.map((event, idx) => (
              <div key={idx} className="event-summary-card">
                <strong>{event.name}</strong>
                <p>{event.description}</p>
              </div>
            ))}
            {todayFriendEvents.map((friendEvent, idx) => (
              <div key = {idx} className = "friend-event-summary-card">
                <strong>{friendEvent.name}</strong>
                <p>{friendEvent.description}</p>
              </div>
            ))}
          </div>
        )}
            </div>
        </div>
    );
}

export default DaySummary;