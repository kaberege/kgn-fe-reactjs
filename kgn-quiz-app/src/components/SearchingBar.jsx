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
        <div className="mb-4 mt-4">
            <input
                type="search"
                value={search}
                placeholder="Search topic..."
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-xl p-2 w-full"
            />
        </div>
    );
}
