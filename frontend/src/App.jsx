import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import EventPopup from "./EventPopup";
import Sidebar from "./Sidebar";
import "./styles.css"

// "format" is to have a cohesive font/styling (comic sans for now >:D); I'll pick a nicer font later
function App() {
  return (
    <>
    <header className = "page-header">
      <h1>Grapevine</h1>
      <h2> <EventPopup /></h2>
      <h3> <ProfilePopup /></h3>
    </header>
    <div className = "page-body">
      <div className="page-layout">
        <Calendar />
        <div className="side-bar">
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
          <h1>
            <Sidebar />
          </h1>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
