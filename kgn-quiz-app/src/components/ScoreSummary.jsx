import React from "react";
import useQuizStore from "./QuizStore";
import HandleTime from "./HandleTime";

export default function ScoreSummary() {
    const { quizScore, myQuiz } = useQuizStore(state => state);
    const result = parseInt((quizScore / myQuiz.length) * 100);
    return (
        <div>
            <h2>Quiz results</h2>
            <p>Your score is: {result}%</p>
            <div>
                <p>Time used: </p>
                <HandleTime/>
            </div>
            
        </div>
    );
}