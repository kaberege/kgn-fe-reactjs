import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";


export default function App() {
  return (
    <div>
      <RecipeList />
      <AddRecipeForm />
    </div>
  );
}