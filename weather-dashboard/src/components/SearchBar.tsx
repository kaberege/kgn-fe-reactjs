import React from 'react'
import { BiSearch } from 'react-icons/bi';

interface SearchTypesPorps {
  search: string;
  setSearch: (value: string) => void;  // type for a setter function
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ search, setSearch, handleSubmit }: SearchTypesPorps) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-row items-center justify-center gap-2 border-2 border-blue-100 max-w-60 p-1 rounded-2xl mx-auto bg-slate-50 shadow-md'
      >
        <input
          id="search"
          type="search"
          name="search"
          value={search}
          placeholder='Enter a city'
          maxLength={15}
          onChange={(e) => setSearch(e.target.value)}
          className="h-full outline-none rounded-full pl-2"
        />
        <button className='flex flex-row items-center justify-center hover:bg-blue-600 rounded-full h-full'><BiSearch size={23} /></button>
      </form>
    </div>
  )
}

export default SearchBar