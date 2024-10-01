import React from "react";
import { Link } from "react-router-dom";
import useQuizStore from "./QuizStore";
import SearchingBar from "./SearchingBar";

export default function History() {
    const filterHistory = useQuizStore(state => state.filterHistory);
    const displayHistory = filterHistory.map(item => {
        return <div key={item.id}>
            <h2>Topic: {item.topic}</h2>
            <h2>Difficulty: {item.level}</h2>
            <div className="">
                <p>Score: {item.scored}%</p>
                <p>Time taken: <span>{`${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}`}</span></p>
                <p>Date: {item.date}</p>
            </div>
        </div>
    }

    );

    return (
        <div>
            <h2>Quiz history</h2>
            <Link to="/">Go back</Link>
            <SearchingBar/>
            <div>
                {
                    <div>{Object.keys(filterHistory)}</div>

                }
            </div>
        </div>

    );
}