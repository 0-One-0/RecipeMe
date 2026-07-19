import { Link, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";

export default function AppLayout(){
  let navigate = useNavigate();
  async function SignOut() {
    await supabase.auth.signOut()
    navigate("/login");
  }
  return<>
  <div className="App-bg">
    <button className="SignOut-btn" onClick={SignOut}>SignOut</button>
    <Outlet/>
    <nav className="layout-nav">
      <Link to="add">Add</Link>
      <Link to="/">Home</Link>
      <Link to="/List">List</Link>
    </nav>
  </div>
  </>
}