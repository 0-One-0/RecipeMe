export default function Recover(){
return <>
<div className="Login-continer">
        <h2 className="auth-title">Recovery</h2>
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
          <div className="button-divider">
            <input type="button" value={"Send"} className="signup-btn-sp" onClick={() => {console.log("Email sent")}}/>
          </div>
        </form>
      </div></>
}