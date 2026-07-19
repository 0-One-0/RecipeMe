import { useState } from "react";
import { supabase } from "../auth/supabaseClient";

export default function Add() {
  const [Title, setTitle] = useState("");
  const [Recipe, setRecipe] = useState("");
  const [Category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const ShowRecipe = () => {
    console.log(Title);
    console.log(Recipe);
    console.log(Category);
  };

  async function handleAddRecipe() {
    setErrorMsg("");
    setConfirmed(false);

    try{
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;

    if (userError || !user) {
      setErrorMsg("Your session has expired. Please log in again.");
      return;
    }

    if (Title.trim() === "") {
      setErrorMsg("Title not added");
      return;
    }
    if (Recipe.trim() === "") {
      setErrorMsg("Recipe not added");
      return;
    }
    if (Category == "") {
      setErrorMsg("Category not added");
      return;
    }

    const { data: insertData, error: insertError } = await supabase
      .from("Recipes")
      .insert({ Title, Recipe, Category, user_id: user.id });

    if (insertError) {
      setErrorMsg(insertError.message);
      return;
    }
    setConfirmed(true);
  }catch(err){
    setErrorMsg("Something went wrong. Please try again.")
  }
  }
  return (
    <>
      <div className="add-continer">
        <form action="">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="Recipe">Recipe</label>
          <input
            type="text"
            name="Recipe"
            value={Recipe}
            onChange={(e) => setRecipe(e.target.value)}
          />
          <select
            name=""
            id=""
            value={Category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="" disabled>
              Choose a category
            </option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Meat">Meat</option>
          </select>

          <input type="button" value={"Add Recipe"} onClick={handleAddRecipe} />
        </form>
        {errorMsg && <p>{errorMsg}</p>}
        {confirmed == true && <p>Recipe has been added.</p>}
      </div>
    </>
  );
}
