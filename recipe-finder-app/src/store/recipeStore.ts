import { create } from "zustand";

// Defining the state type
interface RecipeState {
    recipeTerm: string;
    setRecipeTerm: (recipeTerm: string) => void;
}

// Creating the store with typed state
const useRecipeStore = create<RecipeState>(set => ({
    recipeTerm: "",
    setRecipeTerm: (recipeTerm) => set({ recipeTerm }),
}));

export default useRecipeStore;