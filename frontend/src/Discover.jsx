import { useState, useEffect} from "react";
import axios from "axios";
import "./styles.css";

function Discover() {
    const [events, setEvents] = useState([]);

    const EventCard = ({ event }) => {
        return (
          <div className="event-card">
            <div className="event-header">
              <span className="event-user">User's name goes here</span>
              <span className="event-datetime">{event.startDt}-{event.endDt}</span>
            </div>
            <h3 className="event-title">{event.name}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-comment-section">
              <label className="comment-label">Comments</label>
              <textarea 
                className="comment-input" 
                placeholder="Add a comment..."
              />
            </div>
          </div>
        );
      };

    useEffect(() => {
        const loadEvents = async () => {
          axios
          .get("http://localhost:3000/events")
          // response will be the json object returned (in this case the data)
          .then((response) => {
            setEvents(response.data);
          })
          .catch((error) => {
            alert("There was an error fetching your data. Please try again.");
          });
        }
        loadEvents();
        }, []);

    return (
        <>
            <ul className="event-list" style={{ listStyleType: "none" }}>
                {events.map((event, idx) => (
                <li key={event.id}>
                    <EventCard event={event} />
                </li>
                ))}
            </ul>
        </>  
    );
}

export default Discover;