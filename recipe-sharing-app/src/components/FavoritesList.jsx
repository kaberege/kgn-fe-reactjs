import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  /* const favorites = useRecipeStore(state => state.favorites.map(id =>
     state.recipes.find(recipe => recipe.id === id && recipe.isChecked === true)
   ));
   */
  const favorites = useRecipeStore(state => state.favorites)
  console.log(favorites)
  return (
    <div className='favorites-list'>
      <h2>My Favorites</h2>
      {favorites.map(recipe => (
        <div key={recipe.id}
          className='favorite-recipe-item'>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;