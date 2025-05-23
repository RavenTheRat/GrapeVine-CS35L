import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import Sidebar from "./Sidebar";
import "./styles.css"

// "format" is to have a cohesive font/styling (comic sans for now >:D); I'll pick a nicer font later
function App() {
  return (
    <>
      <div className="format">
        <ProfilePopup />
        <h2>GrapeVine</h2>
      </div>
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
    </>
  );
}

export default App;
