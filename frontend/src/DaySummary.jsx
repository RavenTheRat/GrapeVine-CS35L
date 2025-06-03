import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'
import axios from "axios";

function DaySummary( {selectedDay, friendsToDisplay, friends} ) {
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


  const handleDelete = async (e, eventID, close) => {
    e.preventDefault();
      axios
        .delete(`http://localhost:3000/event/${eventID}`, {
        withCredentials: true,
        })
        .then((response) => {
          close()
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error deleting your data. Please try again.");
        });
  }

    return (
        <div className = "day-summary">
            <header className = "day-summary-header">
                {selectedDay.toDateString()}
            </header> 

            <div className = "day-summary-body">
                {todayEvents.length === 0 && todayFriendEvents.length === 0 ? (
          <p></p> // display nothing!!!
        ) : (
          <div className="day-summary-list">
            {todayEvents.map((event, idx) => (
              <div key={idx} className="event-summary-card" style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <Popup
                      trigger={<button className = "delete-event-button">X</button>}
                          modal
                          nested
                        >
                        {(close) => (
                          <div className="modal">
                            <h2>
                              Delete Event?
                            </h2>
                          <form onSubmit={(e) => handleDelete(e, event.id, close)}>
                          <div>
                          <button type="submit">Delete</button>
                          <button type="button" onClick={close}>Cancel</button>
                          </div>
                          </form>
                          </div>
                          )}
                      </Popup>
                    </div>
                <strong>{event.name}</strong>
                <p>{event.description}</p>
              </div>
            ))}
            {todayFriendEvents
              .filter((event) => friendsToDisplay.includes(event.userId))
              .map((friendEvent, idx) => (
              <div key={idx} className="friend-event-summary-card">
                <div className = "friend-name-card">
                  {friends.find(f => f.id === friendEvent.userId) &&
                  <p>{friends.find(f => f.id === friendEvent.userId).name}</p> }
                </div>
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