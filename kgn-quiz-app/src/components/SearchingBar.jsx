import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";

// Search bar for filtering quiz history
export default function SearchingBar() {
    const setFilterHistory = useQuizStore(state => state.setFilterHistory);
    const setSearchTerm = useQuizStore(state => state.setSearchTerm);
    const [search, setSearch] = useState("");

    useEffect(() => {
       if (search !== "") {
            setSearchTerm(search);
            setFilterHistory();
        }
    }, [search]);

    return (
        <div className="mb-4 mt-4 max-w-96 mx-auto">
            <input
                type="search"
                value={search}
                placeholder="Search topic..."
                onChange={(e) => setSearch(e.target.value)}
                className="border border-lime-200 outline-lime-700 rounded-xl p-2 w-full shadow-lg"
            />
        </div>
    );
}
