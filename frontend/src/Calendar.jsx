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
      // response will be the json object returned (in this case the id)
      // this can optionally be sent to a higher level component and used there
      // in this case we are just closing the popup
      .then((response) => {
        setEvents(response);
      })

      // error can be used to give better error messages, but we probably
      // won't need to do that for this project
      .catch((error) => {
        alert("There was an error fetching your data. Please try again.");
      });
        
      }
      loadEvents();
    }, []);
    




  

  return (
    <div className="calendar">
      <div
        className="calendar-header"
        style={{
          backgroundColor: "whitesmoke",
          paddingRight: "20px",
        }}
      >
        <h2>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h2>
        <div style={{ color: "#5f3a5f", marginRight: "10px", paddingLeft: "700px" }}>
          <EventPopup />
        </div>
      </div>
      <div
        className="calendar-body"
        style={{ backgroundColor: "thistle", padding: "20px" }}
      >
        <div
          className="table-header"
          style={{ backgroundColor: "#c5a0c5", padding: "20px" }}
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
