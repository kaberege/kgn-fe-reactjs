import { useParams } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";


function RecipeDetails() {
  const {idMeal} = useParams();
  console.log(idMeal);
  const recipeDetails = useRecipeStore(state => state.recipeResults.find(recipe => recipe.idMeal === idMeal));

  return (
    <div>RecipeDetails {idMeal}</div>
  )
}

export default RecipeDetails