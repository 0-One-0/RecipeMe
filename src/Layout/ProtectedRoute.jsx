import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }

      setLoading(false);
    }

    checkUser();
  }, []);
  useEffect(() => {
      document.body.style.backgroundColor = "#2E211A";
  
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);

  if (loading) return <p>Loading...</p>;

  return isLoggedIn ? <Outlet /> : null;
}
