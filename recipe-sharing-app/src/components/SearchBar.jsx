import React, { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
    const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
    const filterRecipes = useRecipeStore(state => state.filterRecipes);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search === "") {
            return;
        } else {
            setSearchTerm(search);
            filterRecipes();
        }
    }, [search]);

    return (
        <div className='search-bar'>
            <input
                type="text"
                value={search}
                placeholder="Search recipes..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;