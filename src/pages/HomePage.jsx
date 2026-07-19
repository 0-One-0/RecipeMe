import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import Home from "../components/Home";
import { useEffect } from "react";

export default function HomePage() {
  
  return (
    <>
      <Home />
    </>
  );
}
