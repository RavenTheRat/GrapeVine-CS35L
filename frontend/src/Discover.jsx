import { useState, useEffect} from "react";
import axios from "axios";
import "./styles.css";

function Discover() {
    const [events, setEvents] = useState([]);

    return (
        <>
            <ul className = "friends-display" style={{ listStyleType: "none" }}>
                {events.map((event, idx) => (
                <li key={idx}>
                    {event}
                </li>
                ))}
            </ul>
        </>  
    );
}

export default Discover;