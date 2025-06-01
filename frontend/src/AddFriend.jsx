import { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'
import axios from "axios";

/*
function AddFriend() {
  // State containing text when searching for a friend to add
  const [searchAddFriend, setSearchAddFriend] = useState("");
  // State containing array of users that are being searched for
  const [displayedUsers, setDisplayedUsers] = useState([]);

  // Searching algorithm
  // Will need to be updated to allow for searching users in database
  const searchForFriends = (e) => {
    e.preventDefault();

    const filteredItems = otherUsers.filter((user) =>
      user.name.toLowerCase().includes(searchAddFriend.toLowerCase()),
    );

    setDisplayedUsers(filteredItems);
  };

  return (
    <div className="side-bar-add">
      <Popup trigger={<button>Add Friend!</button>} modal nested>
        {(close) => (
          <>
            <div className="modal">
              <div className="side-bar">
                <h2>Add Friends</h2>
                <form onSubmit={searchForFriends}>
                  <input
                    type="text"
                    placeholder="Enter an email address"
                    value={searchAddFriend}
                    onChange={(e) => setSearchAddFriend(e.target.value)}
                  />
                  <button type="submit" style={{ marginLeft: "5px" }}>
                    Search
                  </button>
                </form>
                <ul style={{ listStyleType: "none" }}>
                  {displayedUsers.map((user) => (
                    <li>{user.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <button onClick={() => close()}>Close</button>
              </div>
            </div>
          </>
        )}
      </Popup>
    </div>
  );
}
  */


/*

function AddFriend() {
  const [email, setEmail] = useState("");

  const handleAddFriend = async (e, onSuccess) => {
    e.preventDefault(); // Prevent form submission from reloading the page
     
    axios
    .post("http://localhost:3000/friends/add", {
      email }
    )
  }

  return (
    <div className = "add-friend">
      <Popup trigger = {<button> Add Friend!</button>} modal nested>
        {(close) => (
          <div className = "modal">
            <h1>Add Friend</h1>
            <form onSubmit = {handleAddFriend}>
              <input
                type = "email"
                placeholder = "Enter friend's email!"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                required
              />
              <button type = "submit"> 
                Send Friend Request!
              </button>
            </form>
          </div>
        )}
      </Popup>
    </div>

  );
}

export default AddFriend;

*/

function AddFriend() {
  const [email, setEmail] = useState("");
  const [friendStatus, setFriendStatus] = useState(""); // used for message display: let user know if request was sent

  const handleAddFriend = async (e) => {
    e.preventDefault();       // to avoid reloading the page ig
    if (!email) {
      setFriendStatus("Please enter an email.");
      return;
    }
    axios
    .post("http://localhost:3000/friends/add", {
      email
    })

    .then((response) => {
      if (response.status === 200) {
        setFriendStatus("Friend request sent!");
      }
    })

    .catch((error) => {
      setFriendStatus("There was an error! Please try again!");
    })
  }

  return (
    <div className="side-bar-add">
      <Popup trigger={<button>Add Friend!</button>} modal nested>
        {(close) => (
          <div className="modal">
            <div className="side-bar">
              <h2>Add Friend</h2>
              <form onSubmit={handleAddFriend}>
                <input
                  type="email"
                  placeholder="Enter an email address!"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  Send Request!
                </button>
              </form>
              {friendStatus && <p>{friendStatus}</p>}
            </div>
            <div>
              <button onClick={() => close()}>Close</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default AddFriend;