import { useEffect, useState } from "react";
import { supabase } from "../auth/supabaseClient";
import Recipe from "./Recipe";

export default function List() {
  const [recipeList, setRecipeList] = useState([]);
  const [Category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const filteredRecipes =
    Category === ""
      ? recipeList
      : recipeList.filter((recipe) => recipe.Category === Category);
  async function fetchRecipes() {
    try {
      const { data, error } = await supabase.from("Recipes").select("*");
      if (error) {
        setErrorMsg(error);
        return;
      }
      setRecipeList(data);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <>
      <div className="list-contianer">
        <select value={Category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Filter category
          </option>
          <option value="">No Filter</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Meat">Meat</option>
        </select>
        <div className="list">
          {loading && <p>Loading...</p>}
          {!loading &&
            !errorMsg &&
            filteredRecipes.map((recipe) => (
              <Recipe
                type={"normal"}
                title={recipe.Title}
                recipe={recipe.Recipe}
                category={recipe.Category}
                id={recipe.id}
                key={recipe.id}
                onUpdate ={fetchRecipes}
              />
            ))}

          {!loading && filteredRecipes.length <= 0 && !errorMsg && (
            <p>Nothing found</p>
          )}
          {!loading && errorMsg && <p>{errorMsg}</p>}
        </div>
      </div>
    </>
  );
}
