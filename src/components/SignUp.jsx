export default function SignUp({
  errorMsg,
  email,
  password,
  setEmail,
  setPassword,
  handleSignUp,
  confirmed,
}) {
  return (
    <>
      <div className="Login-continer">
        <h2 className="auth-title">Sign Up</h2>
        <form action="" className="Form-Style">
          {errorMsg && <p className="error-text">{errorMsg}</p>}
          {confirmed == true && <p>Email has been sent</p>}
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
              value={"Sign Up"}
              className="signup-btn-sp"
              onClick={() => handleSignUp()}
            />
          </div>
        </form>
      </div>
    </>
  );
}
