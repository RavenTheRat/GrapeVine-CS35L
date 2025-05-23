import Calendar from "./Calendar";
import ProfilePopup from "./ProfilePopup";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <div>
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
