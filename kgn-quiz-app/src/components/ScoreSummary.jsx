import React from "react";
import useQuizStore from "./QuizStore";
import "../index.css";
import { Link } from "react-router-dom";

export default function ScoreSummary() {

    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);

    function retakeQuiz() {
        setQuizLoader(false);
        setQuizState("quiz");
    }

    return (
        <div>
            <h2>Quiz results</h2>
            <div>
                <Link to="history">Go to history</Link>
            </div>
            <div>
                <p>Number of questions: {quizScore.questions}</p>
                <p>Correct answers: {quizScore.correct}</p>
                <p>Failed: {quizScore.questions - quizScore.correct}</p>
                <p>Your average score is: {quizScore.scored}%</p>
            </div>
            <div>
                <p>Time used: <span>{`${quizScore.spent.hours}:${quizScore.spent.minutes}:${quizScore.spent.seconds}`}</span></p>
            </div>
            <div>
                <button
                    onClick={retakeQuiz}
                    className="border border-blue-500"
                >Retake quiz</button>
                <button
                    onClick={() => setQuizState("start")}
                    className="border border-violet-950"
                >New quiz</button>
            </div>
        </div>
    );
}