import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import AddFriend from "./AddFriend";
import EventPopup from "./EventPopup";
import Sidebar from "./Sidebar";
import DaySummary from "./DaySummary";
import Discover from "./Discover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import { useState, useEffect} from "react";
import "./styles.css"

import MainDisplay from "./MainDisplay";
import Login from "./Login";

// "format" is to have a cohesive font/styling (comic sans for now >:D); I'll pick a nicer font later
function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setLoggedIn(response.data); // set if user is logged in!
      } catch (error) {
        setLoggedIn(null); // set if user is not logged in!
      }
    };
    checkAuth();
    }, []);

    // render either the Login page or the MainDisplay!
    return loggedIn ? <MainDisplay /> : <Login />
}

export default App;
