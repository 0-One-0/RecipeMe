import { useNavigate } from "react-router-dom"
import { supabase } from "../auth/supabaseClient"

export default function HomePage(){
  let navigate = useNavigate();
  async function SignOut() {
    await supabase.auth.signOut()
    navigate("/login");
  }
  return <>
  home page
  <button onClick={SignOut}>SignOut</button>
  </>
}