import Calendar from "./Calendar";
import AddFriend from "./AddFriend";
import RemoveFriend from "./RemoveFriend";
import EventPopup from "./EventPopup";
import Discover from "./Discover";
import ProfilePopup from "./ProfilePopup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./styles.css"

function MainDisplay({className = ""}) {
    return (
    <>
    <div className = "body-font">
    <header className = "page-header">
      <h1 className = "logo-header">GRAPEVINE</h1>
      <div className = "right-header">
        <h2> <ProfilePopup /></h2>
        <h2> <EventPopup /></h2>
        <h2> <AddFriend /></h2>
        <h1> <RemoveFriend /></h1>
        <h1> 
          <button
            onClick={() => {
              window.location.href = "http://localhost:3000/logout";
            }}
            className = "cute-buttons"
          >
            Logout
          </button>
        </h1>
      </div>
    </header>
    <Tabs>
      <TabList className="tab-list">
        <Tab>Calendar</Tab>
        <Tab>Discover</Tab>
      </TabList>
      <TabPanel>
        <div className = "page-body">
          <div className="page-layout">
            <Calendar />
          </div>
        </div>
        </TabPanel>
        <TabPanel>
          <div className = "page-body">
            <div className="page-layout">
              <Discover />
            </div>
          </div>
        </TabPanel>
    </Tabs>
      </div>
    </>
  );
}

export default MainDisplay;