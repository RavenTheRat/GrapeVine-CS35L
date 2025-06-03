import { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'
import axios from "axios";

function AddFriend() {
  // State containing text when searching for a friend to add
  const [searchAddFriend, setSearchAddFriend] = useState("");
  // State containing array of users that are being searched for
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (searchAddFriend) {
      axios
        .post("http://localhost:3000/friends/add", {
          email: searchAddFriend.toLowerCase()
        })
        .then((response) => {
          setSearchAddFriend("");
          alert("Friend request sent!");
          onSuccess();
        })
        .catch((error) => {
          console.log(error);
          alert("Friend request sent!");
          onSuccess();
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="side-bar-add">
      <Popup trigger={<button className = "cute-buttons">Add Friend</button>} modal nested>
        {(close) => (
          <>
            <div className="modal">
              <div>
                <h2>Add Friends</h2>
                <form onSubmit={(e) => handleSubmit(e, () => {
                  close();
                  window.location.reload();
                })}>
                  <input
                    type="text"
                    placeholder="Enter an email address"
                    value={searchAddFriend}
                    onChange={(e) => setSearchAddFriend(e.target.value)}
                  />
                  <button type="submit" style={{ marginLeft: "5px" }} className = "cute-buttons">
                    Add
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

export default AddFriend;