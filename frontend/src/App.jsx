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
import Popup from 'reactjs-popup';
import CalendarDays from './days.jsx';
import './calendar.css';
import 'reactjs-popup/dist/index.css';

/* temporary list of friends for testing purposes,
   in the future will be replaced with user's friends
  */
const friends = [
  {name: "Adelisa"},
  {name: "David"},
  {name: "Remi"},
  {name: "Thomas"},
  {name: "Zayd"}
];

/* temporary list of users that are not friended by the current user,
   in the future will be replaced with users in the backend database
  */
const otherUsers = [
  {name: "Eggert"},
  {name: "Bob"},
  {name: "Daniel"},
  {name: "Genericname"}
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
      <div>
        <ProfilePopup />
        <h2>
          GrapeVine
        </h2>
      </div>
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

// Profile button in top right (contains username and profile photo)
// onClick: Opens a popup that displays the username and profile photo
// To add: display the user's email, button to edit friends list, and logout button
function ProfilePopup() {
  const ProfileButton = React.forwardRef(({open, ...props}, ref) =>(
    <div ref={ref} {...props}>
        <div className="profile-button">
          <text className="profile-button-text">
          Username
          </text>
          <img
            src="https://helloartsy.com/wp-content/uploads/kids/fruit/how-to-draw-a-grapevine/how-to-draw-a-grapevine-step-6.jpg"
            id="profile-photo">
          </img>
        </div>
      </div>
  ));

  return (
    <Popup trigger=
        {<ProfileButton open={open}/>}
        modal nested>
          {
            close => (
              <>
                <div className="modal">
                  <div className="side-bar">
                    <h2>Profile</h2>
                    <h3>Username</h3>
                    <img
                      src="https://helloartsy.com/wp-content/uploads/kids/fruit/how-to-draw-a-grapevine/how-to-draw-a-grapevine-step-6.jpg"
                      id="profile-button-img">
                    </img>
                  </div>
                  <div>
                    <button onClick={() => close()}>
                      Close
                    </button>
                  </div>
                </div>
              </>
            )
          }
      </Popup>
  );
}

function Sidebar() {
  // State containing text from search box
  const [searchItem, setSearchItem] = useState('');
  // State containing the list of friends matching search query
  // using implementation with temporary friends array
  // to be replaced with user's friends from database
  const [filteredFriends, setFilteredFriends] = useState(friends);
  // State: checked or unchecked for a checkbox
  const [checked, setChecked] = useState([]);

  // Searching algorithm
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredFriends(filteredItems);
  }

  // Event handler for the check boxes, updates newChecked state with list of selected friends
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if(currentIndex === -1)
      newChecked.push(value);
    else
      newChecked.splice(currentIndex, 1);

      setChecked(newChecked);
  }

  return (
    <>
    <div>
      <h2>
        Friends
      </h2>
      <AddFriend />
    </div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search friends list"
      />
      <ul style={{listStyleType:'none'}}>
        {filteredFriends.map((friend) => (
          <li>
            <input
              type="checkbox"
              checked={checked.includes(friend.name)}
              onChange={handleToggle(friend.name)}>
            </input>
            {friend.name}
          </li>
        ))}
      </ul>
    </>
  );
}

function AddFriend() {
  // State containing text when searching for a friend to add
  const [searchAddFriend, setSearchAddFriend] = useState('');
  // State containing array of users that are being searched for
  const [displayedUsers, setDisplayedUsers] = useState([]);
  
  // Searching algorithm
  // Will need to be updated to allow for searching users in database
  const searchForFriends = (e) => {
    e.preventDefault();

    const filteredItems = otherUsers.filter((user) =>
      user.name.toLowerCase().includes(searchAddFriend.toLowerCase()));
    
    setDisplayedUsers(filteredItems);
  }


  return (
    <div className="side-bar-add">
      <Popup trigger=
        {<button>+</button>}
        modal nested>
          {
            close => (
              <>
                <div className="modal">
                  <div className="side-bar">
                    <h2>Add Friends</h2>
                    <form onSubmit={searchForFriends}>
                      <input
                        type="text"
                        placeholder="Enter an email address"
                        value={searchAddFriend}
                        onChange={(e) => setSearchAddFriend(e.target.value)}/>
                      <button type="submit" style={{marginLeft: '5px'}}>Search</button>
                      </form>
                        <ul style={{listStyleType:'none'}}>
                          {displayedUsers.map((user) => (
                            <li>{user.name}</li>
                          ))}
                        </ul>
                  </div>
                  <div>
                    <button onClick={() => close()}>
                      Close
                    </button>
                  </div>
                </div>
              </>
            )
          }
      </Popup>
    </div>
  )
}