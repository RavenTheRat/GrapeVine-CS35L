import { useEffect, useState } from "react";
import './styles.css'
import axios from "axios";

function Sidebar({friends}) {
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
                <input type="checkbox" />
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
