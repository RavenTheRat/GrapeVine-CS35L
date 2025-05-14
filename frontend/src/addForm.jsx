import React, { useState } from "react";

function EventPopup({ trigger, setTrigger, onAddEvent }) {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = () => {
        if (date && description) {
            onAddEvent({ date, description });
            setDate("");
            setDescription("");
            setTrigger(false);
        } else {
            alert("Please fill in both date and description.");
        }
    };

    return trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>Add New Event</h2>
                <label>
                    Date:
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </label>
                <label>
                    Description:
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Event details" 
                    />
                </label>
                <button className="add-event" onClick={handleAdd}>Add</button>
                <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
            </div>
        </div>
    ) : null;
}

export default EventPopup;
