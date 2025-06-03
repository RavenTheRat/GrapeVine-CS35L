import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import { useState, useEffect} from "react";
import "./styles.css"

import MainDisplay from "./MainDisplay";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);     // this is for a smoother transition when logging in!

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        setLoggedIn(response.data); // set if user is logged in!
      } catch (error) {
        setLoggedIn(null); // set if user is not logged in!
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
    }, []);

    if (loading) {
      return null;
    }

    // render either the Login page or the MainDisplay!
    return loggedIn ? <MainDisplay className="fade-in"/> : <Login />
}

export default App;
