import React, { useState, useEffect } from "react";
import "../index.css";
import useQuizStore from "./QuizStore";


export default function SearchingBar() {
    const setFilterHistory = useQuizStore(state => state.setFilterHistory);
    const setSearchTerm = useQuizStore(state => state.setSearchTerm);

    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search === "") {
            return;
        } else {
            setSearchTerm(search);
            setFilterHistory();
        }

    }, [search]);

    return (
        <div>
            <input
                type="text"
                value={search}
                placeholder="Seach topic..."
                onChange={(e) => setSearch(e.target.value)}
                className="border"
            />
        </div>
    )
}