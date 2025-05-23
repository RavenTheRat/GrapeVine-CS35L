import { useState } from "react";
import AddFriend from "./AddFriend";

const friends = [
  { name: "Adelisa" },
  { name: "David" },
  { name: "Remi" },
  { name: "Thomas" },
  { name: "Zayd" },
];

/* temporary list of users that are not friended by the current user,
   in the future will be replaced with users in the backend database
  */
const otherUsers = [
  { name: "Eggert" },
  { name: "Bob" },
  { name: "Daniel" },
  { name: "Genericname" },
];

function Sidebar() {
  // State containing text from search box
  const [searchItem, setSearchItem] = useState("");
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
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredFriends(filteredItems);
  };

  // Event handler for the check boxes, updates newChecked state with list of selected friends
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  return (
    <>
      <div>
        <h2>Friends</h2>
        <AddFriend />
      </div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search friends list"
      />
      <ul style={{ listStyleType: "none" }}>
        {filteredFriends.map((friend, idx) => (
          <li key={idx}>
            <input
              type="checkbox"
              checked={checked.includes(friend.name)}
              onChange={handleToggle(friend.name)}
            ></input>
            {friend.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sidebar;
