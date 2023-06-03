import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name:"",
    ingredients: "",
    link: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // change to env variable later
      await axios.post("https://joshrecipebook-api.herokuapp.com/recipes/", {...recipe}, {headers: { authorization: cookies.access_token}, });
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange}/>

        <label htmlFor="link">Recipe Link</label>
        <input type="text" id="link" name="link" value={recipe.link} onChange={handleChange} />

        <label htmlFor="imageUrl">Image Link</label>
        <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        <textarea id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange} />

        <label htmlFor="cookingTime">Cooking Time in Minutes</label>
        <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};