import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import fetchRecipes from '../data/fetchData'
import useRecipeStore from '../store/recipeStore'
import { RecipesData } from '../store/types'

//Defining types of fetched data
const RecipeCard = () => {
    const [error, setError] = useState<string>("");
    const [load, setLoad] = useState<string>("");
    // const [results, setResults] = useState<RecipesData[] | null>(null);
    const recipeTerm: string = useRecipeStore(state => state.recipeTerm);
    const results: RecipesData[] | null = useRecipeStore(state => state.recipeResults);
    const setResults = useRecipeStore(state => state.setRecipeResults);

    useEffect(() => {
        console.log(recipeTerm);
        // if (recipeTerm) fetchedData(recipeTerm);
    }, [recipeTerm]);

    async function fetchedData(term: string): Promise<void> {
        setError("");
        setLoad("Loading...");
        try {
            const data: RecipesData[] = await fetchRecipes(term);
            console.log("found data is: ", data);
            if (!data) {
                setError("Item not found");
            } else {
                setResults(data);
            }
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
            <SearchBar fetchedData={fetchedData} />
            {load ? <p className='text-center text-[18px] mt-3'>{load}</p> : (
                error ? <p className='text-center text-[18px] mt-3 text-red-400'>{error}</p> :
                    <div className='w-full max-w-7xl flex max-2xl:flex-row gap-5 justify-center flex-wrap my-14 mx-auto'>
                        {
                           results.length > 0 && (
                                results.map((recipe, index) => (
                                    <div
                                        key={index}
                                        className='bg-amber-200 max-sm:w-full w-3xs p-2 rounded-2xl'
                                    >
                                        <img src={recipe.strMealThumb} alt="Recipe image" className='h-36 w-full rounded-2xl' />
                                        <p>Recipe Title: {recipe.strMeal}</p>
                                        <p>Category: {recipe.strCategory}</p>
                                        <p>Cuisine: {recipe.strArea}</p>
                                        <Link
                                            to={`/details/${recipe.idMeal}`}
                                            className='text-center text-blue-800 hover:text-blue-400'
                                        >View details</Link>
                                    </div>
                                ))
                            )
                        }
                    </div>
            )
            }
        </div>
    )
}

export default RecipeCard