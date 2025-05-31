import { useState } from "react";
import Popup from "reactjs-popup";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import axios from "axios";
import './styles.css';

function EventPopup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (name && description && startDate && endDate) {
      console.log(isPublic);
      axios
        .post("http://localhost:3000/event/new", {
          name: name,
          description: description,
          startDt: new Date(startDate),
          endDt: new Date(endDate),
          isPublic: isPublic
        })
        // response will be the json object returned (in this case the id)
        // this can optionally be sent to a higher level component and used there
        // in this case we are just closing the popup
        .then((response) => {
          setName("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          setIsPublic(false);
          onSuccess();
        })
        // error can be used to give better error messages, but we probably
        // won't need to do that for this project
        .catch((error) => {
          console.log(error);
          alert("There was an error submitting your data. Please try again.");
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Popup
      trigger={<button className="add-event-btn">Schedule Event!</button>}
      modal
      nested
      contentStyle={{ color: '#5f3a5f' }}
    >
      {(close) => (
        <div className="modal">
          <h2>Add New Event</h2>
          <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e, close)}>
            <div className="flex flex-col gap-4">
              Name:
              <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Event"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              Description:
              <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event details"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              Start Date:
              <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-4">
              End Date:
              <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="checkbox"
                id="public-toggle"
                defaultChecked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <label htmlFor="public-toggle">Do you want this event to be public?</label>
            </div>
            
            <div>
              <button type="submit">Submit</button>
              <button onClick={close}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default EventPopup;
