/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */

import React, { Component, useState } from 'react';
import CalendarDays from './days.jsx';
import './calendar.css'

const friends = [
  {name: "Adelisa"},
  {name: "David"},
  {name: "Remi"},
  {name: "Thomas"},
  {name: "Zayd"}
];

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
    }
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  render() {
    return (
      <>
      <div className="page-layout">
      <div className="calendar">
        <div className="calendar-header" style = {{ backgroundColor: 'whitesmoke', padding: '20px'}}>
          <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
        </div>
        <div className="calendar-body"style = {{ backgroundColor: 'thistle', padding: '20px'}}>
          <div className="table-header" style = {{ backgroundColor: '#c5a0c5', padding: '20px'}}>
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
      <div className="side-bar">
        <h1><Sidebar /></h1>
      </div>
      </div>
    </>
    )
  }
}

function Sidebar() {
  /* temporary list of friends for testing purposes,
     in the future will be replaced with user's friends
     */

  const [searchItem, setSearchItem] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends); // [] will be replaced with the current user's friends list

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredFriends(filteredItems);
  }

  return (
    <>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search friends list"
      />
      <ul>
        {filteredFriends.map((friend) => <li>{friend.name}</li>)}
      </ul>
    </>
  );
}