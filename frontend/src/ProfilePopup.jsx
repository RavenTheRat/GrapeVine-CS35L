import React from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import './styles.css'

// Profile button in top right (contains username and profile photo)
// onClick: Opens a popup that displays the username and profile photo
// To add: display the user's email, button to edit friends list, and logout button
function ProfilePopup() {
  const ProfileButton = React.forwardRef(({ open, ...props }, ref) => (
    <div ref={ref} {...props}>
      <div className="profile-button">
        <p className="profile-button-text">Welcome, Username!</p>
        <img
          src="https://helloartsy.com/wp-content/uploads/kids/fruit/how-to-draw-a-grapevine/how-to-draw-a-grapevine-step-6.jpg"
          id="profile-photo"
        ></img>
      </div>
    </div>
  ));

  return (
    <Popup trigger={<ProfileButton open={open} />} modal nested>
      {(close) => (
        <>
          <div className="modal">
            <div className="side-bar">
              <h2>Profile</h2>
              <h3>Username</h3>
              <img
                src="https://helloartsy.com/wp-content/uploads/kids/fruit/how-to-draw-a-grapevine/how-to-draw-a-grapevine-step-6.jpg"
                id="profile-button-img"
              ></img>
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

export default ProfilePopup;
