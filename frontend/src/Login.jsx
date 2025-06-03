import image from "./assets/grapevine_title.png"

// make this prettier later!
function Login() {
  return (
    <div className = "login-parent">
      <div className = "login-page">
        <div className = "welcome-message">
          <img src={image} alt="My Title" />
          <button
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }} className = "login-button"
        >
          Login
        </button>
        </div>
        </div>
      </div>
  );
}

export default Login;