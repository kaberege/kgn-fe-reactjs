import { useState } from 'react'
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
    const [search, setSearch] = useState<string>("");  // Searched recipe term
    const [error, setError] = useState<string>("");  // Set error if searched term is empty
    const setRecipeTerm: (recipeTerm: string) => void = useRecipeStore(state => state.setRecipeTerm);

    // Function to handle recipe searching
    function recipeTerm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setError("");
        if (search) {
            setRecipeTerm(search);
            console.log(`Searched term is: ${search}`);
        } else {
            setError("Please enter a text!")
        }
        setSearch("");
    }

    return (
        <div>
            <form onSubmit={recipeTerm}>
                <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    className=' border-2 border-amber-500'
                />
                <button className='border-2 bg-amber-200'>Search</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    )
}

export default SearchBar