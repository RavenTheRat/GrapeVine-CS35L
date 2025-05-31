import { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'

function DaySummary( {events, selectedDay}) {
    if (!selectedDay) {
    return <div className="day-summary">Loading date...</div>;
  }
    const pad = (num) => num.toString().padStart(2, "0");
    const dateToDisplay = `${selectedDay.getFullYear()}-${pad(selectedDay.getMonth() + 1)}-${pad(selectedDay.getDate())}`;

    const todayEvents = events.filter(
    (event) => event.startDt.slice(0, 10) === dateToDisplay);

    return (
        <div className = "day-summary">
            <header className = "day-summary-header">
                {selectedDay.toDateString()} — Events:
            </header> 

            <div className = "day-summary-body">
                {todayEvents.length === 0 ? (
          <p>Nothing to see here!</p>
        ) : (
          <ul className="day-summary-list">
            {todayEvents.map((event, idx) => (
              <li key={idx} className="day-summary-item">
                <strong>{event.name}</strong>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        )}
            </div>
        </div>
    );
}

export default DaySummary;