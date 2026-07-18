export default function UpdatePassword({
  errorMsg,
  password,
confirmed,
  setPassword,
  handleUpdate,
}) {
  return (
    <>
      <div className="Login-continer">
        <h2 className="auth-title">Sign Up</h2>
        <form action="" className="Form-Style">
          {errorMsg && <p className="error-text">{errorMsg}</p>}
          {confirmed == true && <p>Update of password has been sent</p>}{" "}
          <div className="input-divider">
            <label htmlFor="password">New Password:</label>
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
              value={"Update Password"}
              className="pass-btn"
              onClick={() => handleUpdate()}
            />
          </div>
        </form>
      </div>
    </>
  );
}
