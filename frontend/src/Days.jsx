import './styles.css'

// hard-coded set of events; this will be replaced by user's events, and have a date associated
// to only display on relevant day (my birthday is currently everyday apparently :P)
const events = [
  { event: "Birthday" },
  { event: "Graduation" },
  { event: "Class" },
];

function Days(props) {
  const firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1,
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay),
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day, idx) => {
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
