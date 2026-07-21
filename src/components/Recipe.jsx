import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";

export default function Recipe({
  type,
  title,
  recipe,
  category,
  id,
  onUpdate,
}) {
  const [ShowRecipe, setShowRecipe] = useState(false);
  const [ShowEdit, setShowEdit] = useState(false);
  const [Title, setTitle] = useState(title);
  const [Recipe, setRecipe] = useState(recipe);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgDel, setErrorMsgDel] = useState("");
  const [Category, setCategory] = useState(category);

  const handleDeleteRecipe = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    setErrorMsgDel("");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const user = userData.user;

      if (userError || !user) {
        setErrorMsg("Your session has expired. Please log in again.");
        return;
      }

      const { error: deleteError } = await supabase
        .from("Recipes")
        .delete()
        .eq("id", id);

      if (deleteError) {
        setErrorMsg(deleteError.message);
        return;
      }

      onUpdate(); // or however you're refreshing the list
    } catch (err) {
      errorMsgDel("Something went wrong. Please try again.");
    }
  };

  const handleUpdateRecipe = async () => {
    setErrorMsg("");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
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

      const { error: updateError } = await supabase
        .from("Recipes")
        .update({ Title, Recipe, Category })
        .eq("id", id);

      if (updateError) {
        setErrorMsg(updateError.message);
        return;
      }
      setShowEdit(false);
      onUpdate();
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {type === "random" ? (
        <>
          <div onClick={() => setShowRecipe(true)} className="recipe-card">
            <div className="top-recipe">
              <h3>{title}</h3>
              <p>{category}</p>
            </div>
          </div>
          {ShowRecipe && (
            <div className="full-screen">
              {" "}
              <button
                onClick={() => setShowRecipe(false)}
                className="leave-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              </button>{" "}
              <p className="recipe-des">{recipe}</p>{" "}
            </div>
          )}
        </>
      ) : (
        <>
          <div onClick={() => setShowRecipe(true)} className="recipe-card">
            <div className="top-recipe">
              <h3>{title}</h3>
              <p>{category}</p>
              <div className="btn-continer-list">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEdit(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path>
                    <path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path>
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRecipe();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
                    <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                  </svg>
                </button>
              </div>

              {errorMsgDel && <p>{errorMsgDel}</p>}
            </div>
          </div>
          {ShowRecipe && (
            <div className="full-screen">
              {" "}
              <button
                onClick={() => setShowRecipe(false)}
                className="leave-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              </button>{" "}
              <p className="recipe-des">{recipe}</p>{" "}
            </div>
          )}
          {ShowEdit && (
            <div className="full-screen">
              {" "}
              <div className="form-edit-continer">
                <form className="form-edit" action="">
                  <label htmlFor="Title">Title</label>
                  <input
                    type="text"
                    name="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="Recipe">Recipe</label>
                  <textarea
                    name="Recipe"
                    onBlur={() => window.scrollTo(0, 0)}
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
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="leave-btn"
                  >
                    Back
                  </button>{" "}
                  <button
                    type="button"
                    onClick={handleUpdateRecipe}
                    className="leave-btn"
                  >
                    Edit
                  </button>{" "}
                  {errorMsg && <p>{errorMsg}</p>}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
