import React from "react";
import { Link } from "react-router-dom";
import useQuizStore from "./QuizStore";
import SearchingBar from "./SearchingBar";

// Displays quiz history and allows searching
export default function History() {
    const filterHistory = useQuizStore(state => state.filterHistory); //returns quiz topic(s) related to the search term.

    return (
        <div className="max-sm:p-0 p-5">
            <h2 className="max-md:text-xl text-2xl text-center font-semibold mb-4">Quiz History</h2>
            <Link to="/" className="text-blue-500 underline transition hover:text-blue-300">Go back</Link>
            <SearchingBar />
            <div className="mt-4">
                {filterHistory.length === 0 && <p className="text-center">History will be displayed here.</p>}
                {filterHistory.length > 0 && filterHistory[0].topic === "No matches found" &&
                    <p className="text-red-500 text-center">{filterHistory[0].topic}</p>
                }
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {filterHistory.length > 0 && filterHistory[0].topic !== "No matches found" &&
                        filterHistory.map(item => (
                            <div key={item.id} className="border w-full rounded p-4 mb-4 shadow cursor-pointer transition hover:scale-105">
                                <h2>Topic: <span className="font-bold">{item.topic}</span></h2>
                                <h3 className="text-gray-700">Difficulty: {item.level}</h3>
                                <p>Score: {item.scored}%</p>
                                <p>Time taken: {`${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}`}</p>
                                <p>Date: {item.date}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
