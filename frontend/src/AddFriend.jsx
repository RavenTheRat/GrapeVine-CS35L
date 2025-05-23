import { useState } from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'

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
      <Popup trigger={<button>+</button>} modal nested>
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

export default AddFriend;
