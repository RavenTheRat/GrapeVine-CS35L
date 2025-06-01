import { useState, useEffect} from "react";
import EventPopup from "./EventPopup";
import DaySummary from "./DaySummary"
import Sidebar from "./Sidebar"
import Days from "./Days";
import axios from "axios";
import "./styles.css";

function Calendar() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  //const [loading, setLoading] = useState(true);

  // Searching algorithm
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = events.filter((event) =>
      //event.name.toLowerCase().includes(searchTerm.toLowerCase()),
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredEvents(filteredItems);
  };

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
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
        //alert("There was an error fetching your data. Please try again.");
      });
    }
    const getFriends = async () => {
      try {
        axios.get("http://localhost:3000/friends")
          .then((response) => {
            setFriends(response.data.users)
            console.log(response.data.users)
          }
          )
      } catch (e) {
        console.log(e)
        setFriends([])
      }
    };
    getFriends();
    loadEvents();
  }, []);

    // for DaySummary:
    const [showDaySummary, setShowDaySummary] = useState(false);
  
  return (
    <div className = "calendar-parent">
    <div className="calendar">
      <div
        className="month-display"
      >
        <h2>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h2>
        <search-field>
          <input
          type="text"
          style={{width: "225px"}}
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Search events by name or description"
          />
        </search-field>

        <button onClick={() => setShowDaySummary((prev) => !prev)}>
          {showDaySummary ? "Hide" : "Show"} Day's Events!
          </button>

      </div>
      <div
        className="calendar-body"
      >
        <div
          className="table-header"
        >
          {weekdays.map((weekday, idx) => {
            return (
              <div key={idx} className="weekday">
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>

        {searchItem.length > 0 ? (
          <Days events = {filteredEvents} day={currentDay} changeCurrentDay={changeCurrentDay} />
        ) : (
          <Days events = {events} day={currentDay} changeCurrentDay={changeCurrentDay} />
        )}
      </div>
    </div>

    {showDaySummary ? (
      <div >
        <DaySummary events={events} selectedDay={currentDay} />
      </div>
    ) : (
      <div >
        <Sidebar friends={friends} />
      </div>
    )}

    </div>
  );
}

// added a button to toggle whether user wants a day's summary or not!

export default Calendar;
