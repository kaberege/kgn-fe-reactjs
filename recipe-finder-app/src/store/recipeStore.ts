import { create } from "zustand";
import { RecipesData } from "./types";

// Defining the state type
interface RecipeState {
    recipeTerm: string;
    setRecipeTerm: (recipeTerm: string) => void;
    recipeResults: RecipesData[];
    setRecipeResults: (results: RecipesData[]) => void;
}

// Creating the store with typed state
const useRecipeStore = create<RecipeState>(set => ({
    recipeTerm: "",
    setRecipeTerm: (recipeTerm) => set({ recipeTerm }),
    recipeResults: [],
    setRecipeResults: (recipes) => set({ recipeResults: [...recipes] }),
}));

export default useRecipeStore;