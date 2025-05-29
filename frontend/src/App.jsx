import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import AddFriend from "./AddFriend";
import EventPopup from "./EventPopup";
import Sidebar from "./Sidebar";
import DaySummary from "./DaySummary"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./styles.css"

// "format" is to have a cohesive font/styling (comic sans for now >:D); I'll pick a nicer font later
function App() {
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
              window.location.href = "http://localhost:3000/login";
            }}
          >
            Login
          </button>
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
      <TabList>
        <Tab>Calendar</Tab>
        <Tab>Discover</Tab>
      </TabList>
      <TabPanel>
        <div className = "page-body">
          <div className="page-layout">
            <Calendar />
            <div className="side-bar">
              <h1>
                <Sidebar />
              </h1>
              <h2>
                <DaySummary />
              </h2>
            </div>
          </div>
        </div>
        </TabPanel>
        <TabPanel>
          <div className = "page-body">
            <div className="page-layout">
              <text>Discover Page goes here.</text>
            </div>
          </div>
        </TabPanel>
    </Tabs>
      </div>
    </>
  );
}

export default App;
