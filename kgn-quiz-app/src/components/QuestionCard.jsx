import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../services/quizSercice";
import "../index.css";

export default function QuestionCard() {
    const fetchChoices = useQuizStore(state => state.quizChoices);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizScore = useQuizStore(state => state.setQuizScore);
    const [myQuiz, setMyQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        handleFetch();
    }, [])
    useEffect(() => {
        console.log(myQuiz)
    }, [myQuiz])
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
            setQuizScore(score);
            setQuizState("score");
        }
    }, [currentQuestionIndex])

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            setCurrentQuestion(myQuiz[currentQuestionIndex]);
        }
    }, [myQuiz, currentQuestionIndex])

    const handleFetch = async () => {
        setLoading(true);
        const amount = fetchChoices.number;
        const difficulty = fetchChoices.difficulty;
        const category = fetchChoices.category;
        try {
            const results = await fetchQuestions(amount, category, difficulty);
            setMyQuiz(results)
        } catch (error) {
            setLoadError("Failed to fetch questions.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function handleAnswer(answer) {
        setCurrentAnswer(answer);

    }

    function handleSubmit() {
        if (currentQuestionIndex < myQuiz.length) {
            const correctAnswer = currentQuestion.correct_answer;
            if (currentAnswer === correctAnswer) {
                setScore(score + 1);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    return (
        <div>
            {loading && <p>Loading questions...</p>}
            {loadError && !Object.keys(currentQuestion).length > 0 && <p>{loadError}</p>}
            {Object.keys(currentQuestion).length > 0 && <div>
                <h2>{currentQuestion.question}</h2>
                <div className="flex flex-col">
                    {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map(answer =>
                        <button
                            key={answer}
                            onClick={() => handleAnswer(answer)}
                            className="border gap-2 border-red-400 bg-slate-500"
                        >
                            {answer}
                        </button>
                    )}
                </div>
                <button onClick={handleSubmit}>Next</button>
            </div>
            }

        </div>
    );
}