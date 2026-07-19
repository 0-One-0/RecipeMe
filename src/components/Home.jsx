import { useEffect, useState } from "react";
import HomeImg from "../assets/gaelle-marcel-GaLWM8dX73U-unsplash.jpg";
import { supabase } from "../auth/supabaseClient";
import Recipe from "./Recipe";
export default function Home() {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [randomRecipe, setRandomRecipe] = useState("");

  function getRandomRecipe() {
    if (recipeList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * recipeList.length);
    setRandomRecipe(recipeList[randomIndex]);
    return;
  }

  useEffect(() => {
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
    fetchRecipes();
  }, []);
  return (
    <>
      <div className="Hero-home">
        <img className="hero-img" src={HomeImg} alt="cooking pot" />
        <h2 className="hero-txt">All recipes in one place</h2>
      </div>
      <div className="Random-continer">
      <button onClick={getRandomRecipe}>random</button>
      {randomRecipe && (
       <Recipe type={"random"} title={randomRecipe.Title} recipe={randomRecipe.Recipe} category={randomRecipe.Category}/>
      )}
      </div>
    </>
  );
}
