import React, { useState } from "react";
import { gvCreateEvent } from "lib/api";

function EventPopup({ onSubmit }) {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = () => {
        if (date && description) {
            onSubmit({ date, description });
            setDate("");
            setDescription("");
        } else {
            alert("Please fill in both date and description.");
        }
    };

    return (
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
        </div>
    );
}

export default EventPopup;
