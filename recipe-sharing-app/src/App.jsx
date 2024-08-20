import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { Route, Router, Routes } from "react-router-dom";

export default function App() {
  function myRoute() {
    const path = "Route, Router, Routes";
    return path;
  }
  console.log(myRoute())
  return (
    <div className="app">
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}