export default function LogIn() {
  return (
    <>
      <div className="Login-continer">
        <h2>Login</h2>
        <form action="" className="Form-Style">
          <div className="input-divider">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="John@email.com"
          />
          </div>
          <div className="input-divider">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*********"
          />
          </div>
          <div className="button-divider">
            <input type="button" value={"Login"} className="login-btn" onClick={() => {console.log("login")}}/>
            <input type="button" value={"Sign Up"} className="signup-btn" onClick={() => {console.log("signup")}}/>
          </div>
        </form>
      </div>
    </>
  );
}
