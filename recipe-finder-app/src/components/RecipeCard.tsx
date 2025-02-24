import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import fetchRecipes from '../data/fetchData'
import useRecipeStore from '../store/recipeStore'

const RecipeCard = () => {
    interface RecipesData {
        strMeal: string;
        strCategory: string;
        strArea: string;
        strInstructions: string;
        strMealThumb: string;
        strTags: string;
        strSource: string;
        strYoutube: string;
        strIngredient1: string;
        strMeasure1: string;
    }

    const [error, setError] = useState<string>("");
    const [load, setLoad] = useState<string>("");
    const [results, setResults] = useState<RecipesData[] | null>(null);
    const recipeTerm: string = useRecipeStore(state => state.recipeTerm);

    useEffect(() => {
        console.log(recipeTerm);
        if (recipeTerm) fetchedData(recipeTerm);
    }, [recipeTerm]);

    async function fetchedData(term: string): Promise<void> {
        setLoad("Loading...");
        try {
            const data: RecipesData[] = await fetchRecipes(term);
            setResults(data);
        } catch (e) {
            console.log(e);
            setError("Failed to fetch");
        } finally {
            console.log("Fetch ended!");
            setLoad("");
        }

    }

    return (
        <div>
            <SearchBar />
            {load && <p>{load}</p>}
            <div className='w-full max-w-7xl flex max-2xl:flex-row gap-5 justify-center flex-wrap mx-auto bg-red-300'>
                {
                    results !== null && results.length > 0 && (
                        results.map((recipe, index) => (
                            <div 
                            key={index}
                            className='bg-amber-200 max-sm:w-full w-3xs p-2 rounded-2xl'
                            >
                                <img src={recipe.strMealThumb} alt="Recipe image" className='h-36 w-full rounded-2xl' />
                                <p>Recipe Title: {recipe.strMeal}</p>
                                <p>Category: {recipe.strCategory}</p>
                                <p>Cuisine: {recipe.strArea}</p>
                                <p className='text-center'>View details</p>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default RecipeCard