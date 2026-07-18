import SignUp from "../components/SignUp";
import { supabase } from "../auth/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmed, setCondirmed] = useState(false);

  let navigate = useNavigate();

  async function handleSignUp() {
    console.log("in here");
    if(password.length < 6){
      setErrorMsg("Password must be at least 6 characters");
      return;
    }
    try {
      setErrorMsg("");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }
      setCondirmed(true);
      navigate("/login")
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <SignUp
        confirmed ={confirmed}
        handleSignUp={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errorMsg={errorMsg}
      />
    </>
  );
}
