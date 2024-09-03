import React from 'react';
import useRecipeStore from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes);
  const setRecipes = useRecipeStore(state => state.setRecipes)
  // const addFavorite = useRecipeStore(state => state.addFavorite);
  // const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const toggleFavorites = useRecipeStore(state => state.toggleFavorite);
 // const filterRecipes = useRecipeStore(state => state.filterRecipes);

  function addMyFavorite(id) {
    //filterRecipes();
    setRecipes(id);
    // addFavorite(id);
    toggleFavorites();
    generateRecommendations();
   
  }

  return (
    <div className='recipe-list'>
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-item">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>View Details</Link>
          <div className='actions '>
            <button onClick={() => addMyFavorite(recipe.id)}>
              {recipe.isChecked ? "Remove from favorites!" : "Add to favorarites!"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
