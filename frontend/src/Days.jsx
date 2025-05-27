import './styles.css'

// hard-coded set of events; this will be replaced by user's events, and have a date associated
// to only display on relevant day (my birthday is currently everyday apparently :P)
const events = [
  { event: "Birthday" },
  { event: "Graduation" },
  { event: "Class" },
];

function Days(props) {
  const firstOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1,
  );
  const weekdayOfFirstDay = firstOfMonth.getDay();
  let allDays = [];
  let day = 0;

  while (day < 42) {
    if (day === 0) {
      if (weekdayOfFirstDay === 0) {
        firstOfMonth.setDate(firstOfMonth.getDate() - 7)
      }
      else {
        firstOfMonth.setDate(firstOfMonth.getDate() + (day - weekdayOfFirstDay));
      }
    } else {
      firstOfMonth.setDate(firstOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstOfMonth),
      number: firstOfMonth.getDate(),
      selected: firstOfMonth.toDateString() === props.day.toDateString(),
      month: firstOfMonth.getMonth(),
      year: firstOfMonth.getFullYear(),
    };
    allDays.push(calendarDay);

    day++;
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
            onClick={() => props.changeCurrentDay(day)}
          >
            <p>{day.number}</p>
            <h1 className="days-events">
              <ul className="event-list">
                {events.map((Event, index) => (
                  <li key={index} className="single-event">
                    {Event.event}
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
