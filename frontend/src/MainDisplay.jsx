import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import AddFriend from "./AddFriend";
import EventPopup from "./EventPopup";
import Discover from "./Discover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./styles.css"

function MainDisplay() {
    return (
    <>
    <div className = "body-font">
    <header className = "page-header">
      <h1 className = "logo-header">GRAPEVINE</h1>
      <div className = "right-header">
        <h1> <EventPopup /></h1>
        <h2> <AddFriend /></h2>
        <h3> <ProfilePopup /></h3>
          <button
            onClick={() => {
              window.location.href = "http://localhost:3000/logout";
            }}
          >
            Logout
          </button>
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