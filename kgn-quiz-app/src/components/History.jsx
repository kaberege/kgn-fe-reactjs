import React from "react";
import { Link } from "react-router-dom";
import useQuizStore from "./QuizStore";
import SearchingBar from "./SearchingBar";

// Displays quiz history and allows searching
export default function History() {
    const filterHistory = useQuizStore(state => state.filterHistory);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Quiz History</h2>
            <Link to="/" className="text-blue-500 underline transition hover:text-blue-300">Go back</Link>
            <SearchingBar />
            <div className="mt-4">
                {filterHistory.length === 0 && <p>History will be displayed here.</p>}
                {filterHistory.length > 0 && filterHistory[0].topic === "No matches found" &&
                    <p className="text-red-500">{filterHistory[0].topic}</p>
                }
                {filterHistory.length > 0 && filterHistory[0].topic !== "No matches found" &&
                    filterHistory.map(item => (
                        <div key={item.id} className="border rounded p-4 mb-4 shadow cursor-pointer transition hover:scale-105">
                            <h2 className="font-bold">Topic: {item.topic}</h2>
                            <h3 className="text-gray-700">Difficulty: {item.level}</h3>
                            <p>Score: {item.scored}%</p>
                            <p>Time taken: {`${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}`}</p>
                            <p>Date: {item.date}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
