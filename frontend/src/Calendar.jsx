import { useState, useEffect} from "react";
import EventPopup from "./EventPopup";
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
  //const [loading, setLoading] = useState(true);

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
        alert("There was an error fetching your data. Please try again.");
      });
    }
    loadEvents();
    }, []);
  
  return (
    <div className="calendar">
      <div
        className="month-display"
        style={{
          backgroundColor: "whitesmoke",
          padding: "20px",
        }}
      >
        <h2>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h2>
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

        <Days events = {events} day={currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  );
}

function GetDate() {
  return <div></div>;
}

// Once I get a better idea of the information held by an event and it's interaction with a date, I will
// implement further.
function TodayDisplay() {
  return (
    <>
      <div>
        <h2 className="today-title">Today's Events:</h2>
      </div>
    </>
  );
}

export default Calendar;
