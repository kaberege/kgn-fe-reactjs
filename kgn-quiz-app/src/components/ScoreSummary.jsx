import React from "react";
import useQuizStore from "../stateStore/QuizStore";
import { Link } from "react-router-dom";
import DownloadShare from "./DownloadShare";

// Displays the score summary after the quiz
export default function ScoreSummary() {
    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);

    //Function for retaking the quiz
    const retakeQuiz = () => {
        setQuizLoader(false);
        setQuizState("quiz");
    };

    return (
        <div className="flex flex-col text-center max-sm:p-2 p-5 bg-slate-50 dark:bg-stone-700 rounded shadow cursor-pointer transition duration-300 hover:scale-105">
            <h2 className="max-md:text-xl text-2xl font-semibold mb-4 dark:text-white">Quiz Results</h2>
            <Link to="/history" className="text-sm text-cyan-600 hover:underline hover:text-cyan-400 transition">Go to history</Link>
            <div className="mt-4 dark:text-slate-300">
                <p>Topic: <span className="font-bold">{quizScore.topic}</span></p>
                <p>Number of Questions: <span className="font-bold">{quizScore.questions}</span></p>
                <p>Correct Answers: <span className="font-bold">{quizScore.correct}</span></p>
                <p>Incorrect Answers: <span className="font-bold">{quizScore.questions - quizScore.correct}</span></p>
                <p>Your Score: <span className="font-bold">{quizScore.scored}%</span></p>
                <p>Time Used: <span className="font-semibold">{`${quizScore.spent.hours}:${quizScore.spent.minutes}:${quizScore.spent.seconds}`}</span></p>
            </div>
            <div className="my-4">
                <button onClick={retakeQuiz} className="bg-blue-500 text-white p-1 rounded transition duration-1000 hover:bg-blue-700">Retake Quiz</button>
                <button onClick={() => setQuizState("start")} className="ml-2 bg-gray-300 p-1 rounded transition duration-300 hover:bg-gray-400">New Quiz</button>
            </div>
            <DownloadShare shareable={quizScore} />
        </div>
    );
}
