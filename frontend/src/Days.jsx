import './styles.css'
import React, { useEffect, useState } from "react";
import axios from "axios";

// hard-coded set of events; this will be replaced by user's events, and have a date associated
// to only display on relevant day (my birthday is currently everyday apparently :P)
//const events = [
  //{ event: "Birthday" },
  //{ event: "Graduation" },
  //{ event: "Class" },
//];

function Days({events, day, userId, friendsToDisplay, changeCurrentDay}) {
  

  const firstOfMonth = new Date(
    day.getFullYear(),
    day.getMonth(),
    1,
  );
  const weekdayOfFirstDay = firstOfMonth.getDay();
  let allDays = [];
  let loopDay = 0;

  while (loopDay < 42) {
    if (loopDay === 0) {
      if (weekdayOfFirstDay === 0) {
        firstOfMonth.setDate(firstOfMonth.getDate() - 7)
      }
      else {
        firstOfMonth.setDate(firstOfMonth.getDate() + (loopDay - weekdayOfFirstDay));
      }
    } else {
      firstOfMonth.setDate(firstOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstOfMonth.getMonth() === day.getMonth(),
      date: new Date(firstOfMonth),
      number: firstOfMonth.getDate(),
      selected: firstOfMonth.toDateString() === day.toDateString(),
      month: firstOfMonth.getMonth(),
      year: firstOfMonth.getFullYear(),
    };
    allDays.push(calendarDay);

    loopDay++;
  }

  return (
    <div className="table-content">
      {allDays.map((day, idx) => {
        return (
          <div
            key={idx}
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => changeCurrentDay(day)}
          >
            <p>{day.number}</p>
            <h1 className="days-events">
              <ul className="event-list">
                {events
                .filter(
                  (event) => 
                    // adi's note on fix: it seemed like all of the events were being displayed one day earlier
                    // this was because of some wonky thing with timezones, so the fix ensures we only check the
                    // date, and not the time (to avoid that issue!)
                    event.startDt.slice(0, 10) === day.date.toISOString().slice(0, 10)
                    // more details from adi: slice extracts the "date part" without the timezone part (gets only
                    // the first 10 chars) turn day.date to ISOString and get the same components to compare!
                )
                .filter((event) => friendsToDisplay.includes(event.userId) || event.userId == userId)
                  .map((event, idx) => (
                    <li
                      key={idx}
                      className="single-event"
                      style={{ color: userId !== event.userId ? 'blue' : 'black' }}
                    >
                      {event.name}
                    </li>
                  ))}
              </ul>
            </h1>
          </div>
        );
      })}
    </div>
  );
}

// at the end comment = ugly but whatever. "days-events" is where we will pull from backend to display events
// associated with the relevant date

export default Days;
