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

import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import CalendarDays from './days.jsx';
import './calendar.css'

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
        <button onClick={() => {
            window.location.href = "http://localhost:3000/login";
              }}>
                Login
        </button>
        <button onClick={() => {
            window.location.href = "http://localhost:3000/logout";
              }}>
                Logout
        </button>
        <h1>more stuff will go here later, trust me</h1>
      </div>
      </div>
    </>
    )
  }
}