import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => state.recipes.find(recipe => recipe.id === parseInt(id)));
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  if (!recipe) return <div>Recipe not found!</div>;
  function addMyFavorite(id) {
    addFavorite(id);
    generateRecommendations();
  }

  function removeMyFavorite(id) {
    removeFavorite(id);
    generateRecommendations();
  }
console.log(recipe)
  return (
    <div className='recipe-details'>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm recipe={recipe} />
      <div className='actions'>
      <DeleteRecipeButton recipeId={recipe.id} />
        <button onClick={() => addMyFavorite(recipe.id)}>Add to favorarites!</button>
        <button onClick={() => removeMyFavorite(recipe.id)}>Remove from favorites!</button>
      </div>
      <span className='back-icon'>&#9664; </span><Link to="/">Back to Home</Link>
    </div>
  );
};

export default RecipeDetails;