import { useState } from 'react'
import useRecipeStore from '../store/recipeStore';

// Defining props that will be passed in the SearchBar component
interface FetchFunction {
    fetchedData: (term: string) => void;
}

const SearchBar = ({ fetchedData }: FetchFunction) => {
    const [search, setSearch] = useState<string>("");  // Searched recipe term
    const [error, setError] = useState<string>("");  // Set error if searched term is empty
    const setRecipeTerm: (recipeTerm: string) => void = useRecipeStore(state => state.setRecipeTerm);

    // Function to handle recipe searching
    function recipeTerm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setError("");
        if (search) {
            setRecipeTerm(search);
            fetchedData(search);
            // console.log(`Searched term is: ${search}`);
        } else {
            setError("Please enter a text!");
        }
        setSearch("");
    }

    return (
        <div className="">
            <form
                onSubmit={recipeTerm}
                className='mx-auto max-w-80 bg-amber-700 mt-7'
            >
                <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    placeholder='Enter a recipe...'
                    className=' border-2 border-amber-500'
                />
                <button className='border-2 bg-amber-200'>Search</button>
            </form>

            {error && <p className='text-center'>{error}</p>}
        </div>
    )
}

export default SearchBar