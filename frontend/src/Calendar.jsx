import { useState } from "react";
import EventPopup from "./EventPopup";
import Days from "./Days";
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

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  return (
    <div className="calendar">
      <div
        className="calendar-header"
        style={{
          backgroundColor: "whitesmoke",
          padding: "20px",
        }}
      >
        <h2>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h2>
        <div style={{ marginRight: "10px" }}>
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

        <Days day={currentDay} changeCurrentDay={changeCurrentDay} />
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
