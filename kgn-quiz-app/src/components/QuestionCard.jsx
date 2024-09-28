import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../services/quizSercice";
import HandleTime from "./HandleTime";
import "../index.css";

export default function QuestionCard() {
    const fetchChoices = useQuizStore(state => state.quizChoices);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizScore = useQuizStore(state => state.setQuizScore);
    const { myQuiz, setMyQuiz } = useQuizStore(state => state);
    const { time, setTime } = useQuizStore(state => state);
    // const [myQuiz, setMyQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    //const [time, setTime] = useState(0);

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            let timer = setTimeout(() => {
                setTime(time);
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [myQuiz, time])

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
            setQuizScore(score);
            setQuizState("score");
        }
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            setCurrentQuestion(myQuiz[currentQuestionIndex]);
        }
    }, [myQuiz, currentQuestionIndex]);

    const handleFetch = async () => {
        setLoading(true);
        const amount = fetchChoices.number;
        const difficulty = fetchChoices.difficulty;
        const category = fetchChoices.category;
        try {
            const results = await fetchQuestions(amount, category, difficulty);
            setMyQuiz(results);
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

    function handleSubmit(e) {
        e.preventDefault();
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
                <h2>Quetsion: {myQuiz.indexOf(currentQuestion) + 1}/{myQuiz.length} </h2>
                <h3>{currentQuestion.question}</h3>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
                    {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map(answer =>
                        <div
                            key={answer}
                        >
                            <input
                                id={answer}
                                type="radio"
                                name="choose"
                                value={answer}
                                checked={currentAnswer === answer}
                                onChange={() => handleAnswer(answer)}
                            />
                            <label
                                htmlFor={answer}
                                className="border gap-2 border-red-400 bg-slate-500"
                            >
                                {answer}
                            </label>

                        </div>
                    )}
                    <button>Next</button>
                </form>
                <div>
                    <p>Time:</p>
                    <HandleTime />
                </div>
            </div>
            }

        </div>
    );
}