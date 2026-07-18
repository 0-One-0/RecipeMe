import { useNavigate } from "react-router";
export default function LogIn({errorMsg, email, password, setEmail, setPassword, handleLogIn}) {
  let navigate = useNavigate();
  const SignUpHandle = () => {
    navigate("/signup");
  };
  const RecoveryHandle = () =>{
    navigate("/recover")
  }
  return (
    <>
      <div className="Login-continer">
        <h2 className="auth-title">Login</h2>
        <form action="" className="Form-Style">
          {errorMsg && <p className="error-text">{errorMsg}</p>}
          <div className="input-divider">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="John@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-divider">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              value={password}
               onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="button-divider">
            <input
              type="button"
              value={"Login"}
              className="login-btn"
              onClick={() => {
                handleLogIn()
              }}
            />
            <input
              type="button"
              value={"Sign Up"}
              className="signup-btn"
              onClick={SignUpHandle}
            />
             <input
              type="button"
              value={"Forgot password?"}
              className="forgot-btn"
              onClick={RecoveryHandle}
            />
          </div>
        </form>
      </div>
    </>
  );
}
