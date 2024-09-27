import React from "react";
import useQuizStore from "./QuizStore";

export default function ScoreSummary() {
    const quizScore = useQuizStore(state => state.quizScore);
    return (
        <div>
            <h2>Score summary</h2>
            <p>Your score is {quizScore}</p>
        </div>
    );
}