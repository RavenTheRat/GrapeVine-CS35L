
// make this prettier later!
function Login() {
  return (
    <div className = "login-page">
      <div className = "welcome-message">
        Welcome to Grapevine!
      </div>
      <div>
      <button
        onClick={() => {
          window.location.href = "http://localhost:3000/login";
        }} className = "login-button"
      >
        Login
      </button>
      </div>
      </div>
  );
}

export default Login;