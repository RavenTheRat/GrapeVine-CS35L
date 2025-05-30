
// make this prettier later!
function Login() {
    return (
    <button
            onClick={() => {
              window.location.href = "http://localhost:3000/login";
            }}
          >
            Login
          </button>
    );
}

export default Login;