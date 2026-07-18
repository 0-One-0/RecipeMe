import { useState } from "react";
import UpdatePassword from "../components/UpdatePassword";
import { supabase } from "../auth/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function UpdatePage() {
  const [Newpassword, setNewpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmed, setCondirmed] = useState(false);

  let navigate = useNavigate();
  async function handleUpdate() {
    console.log("in here");
    if (Newpassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setErrorMsg("");
      const { data, error } = await supabase.auth.updateUser({
        password: Newpassword,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }
      setCondirmed(true);
      navigate("/login");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <UpdatePassword
        confirmed={confirmed}
        password={Newpassword}
        setPassword={setNewpassword}
        errorMsg={errorMsg}
        handleUpdate={handleUpdate}
      />
    </>
  );
}
