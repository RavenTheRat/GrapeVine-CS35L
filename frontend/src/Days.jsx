import './styles.css'

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

            <div className="calendar-event-list">
            {(() => {
              const dayEvents = events
                .filter(
                  (event) =>
                    event.startDt.slice(0, 10) === day.date.toISOString().slice(0, 10))
                .filter(
                  (event) =>
                    friendsToDisplay.includes(event.userId) || event.userId === userId);

                  let maxVisible = 2;

                  if (dayEvents.length > 2) {
                    maxVisible = 1;
                  }

                  const visibleEvents = dayEvents.slice(0, maxVisible);
                  const hiddenCount = dayEvents.length - maxVisible;

                  return (
                    <>
                    {visibleEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className="calendar-event-card"
                        style={{backgroundColor: userId !== event.userId ? '#b4be89' : '#f9f9f9'}}>
                        <strong>{event.name}</strong>
                      </div>
                    ))}
                    {hiddenCount > 0 && (
                      <div className="calendar-event-card more-indicator">
                        +{hiddenCount} more
                      </div>
                    )}</>);})()}
            </div>
          </div>);})}
    </div>);
}

export default Days;
