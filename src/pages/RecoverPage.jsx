import Recover from "../components/Recover";
import { supabase } from "../auth/supabaseClient";
import { useState } from "react";

export default function RecoverPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");

  async function handleRecovery() {
    console.log("in here");

    try {
      setErrorMsg("");
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/update-password",
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <Recover email={email} setEmail={setEmail} handleRecovery={handleRecovery} errorMsg={errorMsg} />
    </>
  );
}
