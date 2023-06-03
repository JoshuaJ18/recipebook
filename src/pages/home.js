import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from 'axios';
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://joshrecipebook-api.herokuapp.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://joshrecipebook-api.herokuapp.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) {
      fetchSavedRecipes();
    }  
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://joshrecipebook-api.herokuapp.com/recipes", {
        recipeID,
        userID,
      }, { headers: { authorization: cookies.access_token }});
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="recipe-container">
      <h1>Community Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <img src={recipe.imageUrl } alt={recipe.name} />
            <div>
              <h3>Alterations:</h3>
              <p>{recipe.ingredients}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <div>
              <a href={recipe.link} target="_blank">Link to Recipe</a>
            </div>
            <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              > {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};