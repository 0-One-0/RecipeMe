import { useNavigate } from "react-router-dom"
import { supabase } from "../auth/supabaseClient"
import Home from "../components/Home"

export default function HomePage(){
  
  return <>
  <Home/>
  </>
}