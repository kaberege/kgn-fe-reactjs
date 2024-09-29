import React from "react";
import useQuizStore from "./QuizStore";
import HandleTime from "./HandleTime";
import "../index.css";
import { Link } from "react-router-dom";

export default function ScoreSummary() {

    const myQuiz = useQuizStore(state => state.myQuiz);
    const quizScore = useQuizStore(state => state.quizScore);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setTime = useQuizStore(state => state.setTime);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);
    const result = parseInt((quizScore / myQuiz.length) * 100);
    const failed = myQuiz.length - quizScore;
    const total = myQuiz.length;

    function retakeQuiz() {
        setQuizLoader(false);
        setTime(0);
        setQuizState("quiz");
    }
    return (
        <div>
            <h2>Quiz results</h2>
            <div>
                <Link to="history">Go to history</Link>
            </div>
            <div>
                <p>Number of questions: {total}</p>
                <p>Correct answers: {quizScore}</p>
                <p>Failed: {failed}</p>
                <p>Your average score is: {result}%</p>
            </div>
            <div>
                <p>Time used: </p>
                <HandleTime />
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