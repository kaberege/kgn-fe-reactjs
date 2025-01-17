import React from 'react';
import { BiSearch } from 'react-icons/bi';

// Defining the types for the props that will be passed to the SearchBar component
interface SearchTypesProps {
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// Functional component for the SearchBar
function SearchBar({ search, setSearch, handleSubmit }: SearchTypesProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-full p-2 max-sm:p-1 w-full max-w-lg bg-white dark:bg-gray-800 shadow-md"
    >
      {/* Search Input */}
      <input
        id="search"
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter a city"
        maxLength={15}
        className="w-full px-3 max-sm:px-1 text-lg max-sm:text-sm text-gray-900 dark:text-white bg-transparent border-none outline-none rounded-full"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:scale-105 flex items-center justify-center transition-colors duration-300"
      >
        <BiSearch size={20} />
      </button>
    </form>
  );
}

export default SearchBar;
