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
      <div className="Home-continer">
        <div className="Hero-home">
          <img className="hero-img" src={HomeImg} alt="cooking pot" />
          <h2 className="hero-txt">All recipes in one place</h2>
        </div>
        <div className="Random-continer">
          <button className="rand-btn" onClick={getRandomRecipe}>
            Get random recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.55 1.68 17.78 10h-1.39l2.56-7.68-1.9-.63-1.76 5.27C14.15 4.62 11.76 3 9 3c-3.86 0-7 3.14-7 7v1c0 3.61 1.9 6.87 5 8.66V21c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.34c3.1-1.78 5-5.05 5-8.66 0-.55-.45-1-1-1h-1.11l2.56-7.68-1.9-.63ZM9 5c2.76 0 5 2.24 5 5h-1.5c0-1.93-1.57-3.5-3.5-3.5S5.5 8.07 5.5 10H4c0-2.76 2.24-5 5-5m1.5 5h-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5m5.06 8.16c-.34.17-.56.52-.56.9V20H9v-.94c0-.38-.22-.73-.56-.9A7.93 7.93 0 0 1 4.06 12h15.88a7.94 7.94 0 0 1-4.38 6.16"></path>
            </svg>
          </button>
          {randomRecipe && (
            <Recipe
              type={"random"}
              title={randomRecipe.Title}
              recipe={randomRecipe.Recipe}
              category={randomRecipe.Category}
            />
          )}
        </div>
      </div>
    </>
  );
}
