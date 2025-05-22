import { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios'

function EventPopup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async (e, onSuccess) => {
      e.preventDefault() // Prevent form submission from reloading the page
      if (name && description && startDate && endDate) {
        axios.post('http://localhost:3000/event/new', {
          name: name,
          description: description,
          startDt: startDate,
          endDt: endDate
        })
        // response will be the json object returned (in this case the id)
        // this can optionally be sent to a higher level component and used there
        // in this case we are just closing the popup
        .then(response => {
          setName("");
          setDescription("");
          setStartDate("");
          setEndDate("");
          onSuccess();
        })
        // error can be used to give better error messages, but we probably
        // won't need to do that for this project
        .catch(error => {
          alert("There was an error submitting your data. Please try again.");
        });
      } else {
        alert("Please fill in all fields.");
      }
    };

    return (
      <Popup
        trigger={<button className="add-event-btn">+ Add Event</button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <h2>Add New Event</h2>
            <form onSubmit={(e) => handleSubmit(e, close)}>
              Name:
              <input 
                type="text" 
                name="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="My Event" 
              />
              Description:
              <input 
                type="text" 
                name="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Event details" 
              />
              Start Date:
              <input 
                type="date" 
                name="startDate"
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
              End Date:
              <input 
                type="date" 
                name="endDate"
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
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
