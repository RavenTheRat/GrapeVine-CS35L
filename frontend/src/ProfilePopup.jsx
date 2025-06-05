import React, { useState, useEffect } from "react";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'

// Profile button in top right (contains username and profile photo)
// onClick: Opens a popup that displays the username and profile photo
// To add: display the user's email, button to edit friends list, and logout button
function ProfilePopup() {
  const [curUser, setCurUser] = useState(null);
  
  useEffect(() => {
    const loadUser = async () => {
      axios
      .get("http://localhost:3000/user")
      // response will be the json object returned (in this case the data)
      .then((response) => {
        setCurUser(response.data);
      })
      .catch((error) => {
        //alert("There was an error fetching your data. Please try again.");
      });
    }
    loadUser();
    }, []);

  if (!curUser) {
    return <div>Loading...</div>;
  }

  const ProfileButton = React.forwardRef(({ open, ...props }, ref) => (
        <p className = "welcome-user"
        style={{ fontSize: '18px' }}>Welcome, {curUser.name}!</p>
  ));

  return (
    <ProfileButton />
  );
}

export default ProfilePopup;
