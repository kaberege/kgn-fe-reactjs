import { useState } from 'react'
import useRecipeStore from '../store/recipeStore';
import { FaSearch } from 'react-icons/fa';

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
                className='mx-auto w-full max-sm:max-w-50 sm:max-w-80 bg-amber-700 mt-7 flex py-1 sm:py-2 px-2 sm:px-4 rounded-full gap-1 items-center'
            >
                <input
                    type="search"
                    name="search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    placeholder='Enter a recipe...'
                    className={`grow max-sm:w-[85%] outline-0 ${error && "border-1 border-red-400"}`}
                />
                <button 
                className='outline-0 cursor-pointer flex items-center justify-center'
                ><FaSearch size={17} className='hover:text-amber-300 transition-colors'/></button>
            </form>

            {error && <p className='text-[18px] text-center text-red-400'>{error}</p>}
        </div>
    )
}

export default SearchBar