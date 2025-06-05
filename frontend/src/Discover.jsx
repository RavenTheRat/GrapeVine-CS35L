import { useState, useEffect} from "react";
import axios from "axios";
import "./styles.css";

function Discover() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const formatDate = (dateString) => {
      const d = new Date(dateString);
      return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
    };

    const EventCard = ({ event }) => {
        return (
          <div className="event-card">
            <div className="event-header">
              <span className="event-user">{event.user.name}</span>
              &nbsp;
              <span className="event-datetime">{formatDate(event.startDt)}</span>
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
          .get("http://localhost:3000/events/public")
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
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{
          marginTop: "25px",
          marginLeft: "56px"
        }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, date, or description"
            style={{
              width: "285px",
              padding: "8px 10px",
              fontSize: "10px",
              fontFamily: "Courier New",
            }}
          />
        </div>
        <div>
          <ul className="event-list">
            {events
              .filter(event => {
                const eventDate = new Date(event.startDt);
                const today = new Date();
                // we don't really care if this is an invalid date, it'll just cause the check to fail later.
                const searchDate = new Date(searchTerm.toLowerCase());

                const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
                const eventUTC = new Date(Date.UTC(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate()));
                const searchUTC = new Date(Date.UTC(searchDate.getUTCFullYear(), searchDate.getUTCMonth(), searchDate.getUTCDate()));

                return eventUTC >= todayUTC && (event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  event.description.toLowerCase().includes(searchTerm.toLowerCase()) || eventUTC.getTime() === searchUTC.getTime());
              })
              .map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Discover;
