import { useEffect, useState } from "react";
import './styles.css'

function Sidebar({friends, onCheckboxToggle}) {
  return (
    <>
      <div className="friend-display">
        <header className="friend-header">
          Friends:
        </header>
        <div className="friend-body">
          <ul className="friends-display" style={{ listStyleType: "none" }}>
            {friends.map((friend) => (
              <li key={friend.id}>
                <input type="checkbox" onClick={() => onCheckboxToggle(friend.id)} />
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
