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
                Leave
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEdit(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRecipe();
                }}
              >
                Delete
              </button>
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
                Leave
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
