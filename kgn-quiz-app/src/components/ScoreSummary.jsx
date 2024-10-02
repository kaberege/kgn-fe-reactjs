import React from "react";
import useQuizStore from "./QuizStore";
import { Link } from "react-router-dom";

// Displays the score summary after the quiz
export default function ScoreSummary() {
    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);

    const retakeQuiz = () => {
        setQuizLoader(false);
        setQuizState("quiz");
    };

    return (
        <div className="p-5 bg-slate-50 rounded shadow transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
            <Link to="history" className="text-blue-500 underline">Go to history</Link>
            <div className="mt-4">
                <p>Number of Questions: {quizScore.questions}</p>
                <p>Correct Answers: {quizScore.correct}</p>
                <p>Incorrect Answers: {quizScore.questions - quizScore.correct}</p>
                <p>Your Score: {quizScore.scored}%</p>
            </div>
            <div className="mt-4">
                <p>Time Used: <span className="font-semibold">{`${quizScore.spent.hours}:${quizScore.spent.minutes}:${quizScore.spent.seconds}`}</span></p>
            </div>
            <div className="mt-4">
                <button onClick={retakeQuiz} className="bg-blue-500 text-white p-1 rounded transition duration-1000 hover:bg-blue-600">Retake Quiz</button>
                <button onClick={() => setQuizState("start")} className="ml-2 bg-gray-300 p-1 rounded transition duration-300 hover:bg-gray-400">New Quiz</button>
            </div>
        </div>
    );
}
