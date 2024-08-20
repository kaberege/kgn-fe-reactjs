import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";

export default function App() {
  return (
    <div className="app">
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}