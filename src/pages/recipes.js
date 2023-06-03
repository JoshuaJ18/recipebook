import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Recipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://joshrecipebook-api.herokuapp.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="recipe-container">
      <h1>Your Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
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
            <div className="link">
              <a href={recipe.link} target="_blank">Link to Recipe</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};