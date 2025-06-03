import React from "react";
import axios from "axios";

function Delete({ eventID, close }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/event/${eventID}`, {
        withCredentials: true,
      });
      close();
    } catch (error) {
      console.log(error);
      alert("There was an error deleting your data. Please try again.");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <div>
        <button type="submit">Delete</button>
        <button type="button" onClick={close}>Cancel</button>
      </div>
    </form>
  );
}

export default Delete;
