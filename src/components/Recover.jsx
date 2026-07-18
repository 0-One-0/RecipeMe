export default function Recover({ email, setEmail, errorMsg, handleRecovery }) {
  return (
    <>
      <div className="Login-continer">
        <h2 className="auth-title">Recovery</h2>
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
          <div className="button-divider">
            <input
              type="button"
              value={"Send"}
              className="signup-btn-sp"
              onClick={() => {
                handleRecovery()
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
