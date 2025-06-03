import { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'
import axios from "axios";

function RemoveFriend() {
  // State containing text when searching for a friend to add
  const [searchRemoveFriend, setSearchRemoveFriend] = useState("");
  // State containing array of users that are being searched for
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (searchRemoveFriend) {
      axios
        .post("http://localhost:3000/friends/remove", {
          email: searchRemoveFriend.toLowerCase()
        })
        .then((response) => {
          setSearchRemoveFriend("");
          alert("Friend removed!");
          onSuccess();
        })
        .catch((error) => {
          console.log(error);
          alert("Friend removed!");
          onSuccess();
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
      <Popup trigger={<button className = "cute-buttons">Remove Friend</button>} modal nested>
        {(close) => (
          <>
            <div className="modal">
              <div className="side-bar">
                <h2>Remove friend</h2>
                <form onSubmit={(e) => handleSubmit(e, () => {
                  close();
                  window.location.reload();
                })}>
                  <input
                    type="text"
                    placeholder="Enter an email address"
                    value={searchRemoveFriend}
                    onChange={(e) => setSearchRemoveFriend(e.target.value)}
                  />
                  <button type="submit" style={{ marginLeft: "5px" }}>
                    Remove
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
  );
}

export default RemoveFriend;
