import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../services/quizSercice";

export default function QuestionCard() {
    const fetchChoices = useQuizStore(state => state.quizChoices);
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizScore = useQuizStore(state => state.setQuizScore);
    const myQuiz = useQuizStore(state => state.myQuiz);
    const setMyQuiz = useQuizStore(state => state.setMyQuiz);
    const setQuizHistory = useQuizStore(state => state.setQuizHistory);
    const quizLoader = useQuizStore(state => state.quizLoader);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [answerOptions, setAnswerOptions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [countTime, setCountTime] = useState(0);
    const [time, setTime] = useState({});
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");

    // Fetch quiz questions if the loader is true
    useEffect(() => {
        if (quizLoader) {
            handleFetch();
        }
    }, [quizLoader]);

    // Timer for the quiz duration
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            handleTime(countTime);
            const timer = setTimeout(() => {
                setCountTime(countTime + 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [myQuiz, countTime]);

    // Update current question and history after the last question
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex === myQuiz.length) {
            myHistory();
            setQuizHistory();
            setQuizState("score");
        }
    }, [currentQuestionIndex]);

    // Set the current question based on the current index
    useEffect(() => {
        if (myQuiz.length > 0 && currentQuestionIndex < myQuiz.length) {
            setCurrentQuestion(myQuiz[currentQuestionIndex]);
        }
    }, [myQuiz, currentQuestionIndex]);

    // Prepare answer options randomly
    useEffect(() => {
        if (Object.keys(currentQuestion).length > 0) {
            const randomAnswer = currentQuestion.correct_answer;
            const currentChoices = [...currentQuestion.incorrect_answers];
            const randomPosition = Math.floor(Math.random() * (currentChoices.length + 1));
            currentChoices.splice(randomPosition, 0, randomAnswer);
            setAnswerOptions(currentChoices);
        }
    }, [currentQuestion]);

    const handleFetch = async () => {
        setLoadError("");
        setLoading(true);
        const { number: amount, difficulty, category } = fetchChoices;

        try {
            const results = await fetchQuestions(amount, category, difficulty);
            setMyQuiz(results);
        } catch (error) {
            setLoadError("Failed to fetch quiz questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (answer) => {
        setCurrentAnswer(answer);
    };

    const myHistory = () => {
        const { category: topicCategory, difficulty: topicLevel } = currentQuestion;
        const topicId = Date.now();
        const d = new Date(topicId);
        const stringDate = d.toString();
        const topicScore = Math.round((score / myQuiz.length) * 100);
        const topicResults = {
            id: topicId,
            topic: topicCategory,
            level: topicLevel.charAt(0).toUpperCase() + topicLevel.slice(1).toLowerCase(),
            correct: score,
            questions: myQuiz.length,
            scored: topicScore,
            spent: time,
            date: stringDate,
        };
        setQuizScore(topicResults);
    };

    const handleTime = (currentTime) => {
        let s = currentTime % 60;
        let m = Math.floor(currentTime / 60) % 60;
        let h = Math.floor(currentTime / 3600);
        const timeValue = {
            hours: h.toString().padStart(2, '0'),
            minutes: m.toString().padStart(2, '0'),
            seconds: s.toString().padStart(2, '0'),
        };
        setTime(timeValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentQuestionIndex < myQuiz.length) {
            const correctAnswer = currentQuestion.correct_answer;
            if (currentAnswer === correctAnswer) {
                setScore(score + 1);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <div className="max-sm:p-0 p-5">
            {loading && <p className="text-lg">Loading questions...</p>}
            {loadError && !Object.keys(currentQuestion).length > 0 && (
                <div className="text-red-500">
                    <p>{loadError}</p>
                    <button onClick={handleFetch} className="text-blue-500 underline">Retry</button>
                </div>
            )}
            {Object.keys(currentQuestion).length > 0 && (
                <div className="shadow rounded max-sm:p-0 p-5">
                    <div className="text-right">
                        <p>Time: <span className="font-semibold text-red-500">{`${time.hours}:${time.minutes}:${time.seconds}`}</span></p>
                    </div>
                    <h2 className="text-xl text-center font-semibold">Question: {currentQuestionIndex + 1}/{myQuiz.length}</h2>
                    <h3 className="mt-2 text-lg">{currentQuestion.question}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {answerOptions.map(answer => (
                            <div key={answer} className="flex items-center mt-2">
                                <input
                                    id={answer}
                                    type="radio"
                                    name="choose"
                                    value={answer}
                                    checked={currentAnswer === answer}
                                    onChange={() => handleAnswer(answer)}
                                    className="mr-2"
                                />
                                <label htmlFor={answer} className="border rounded p-1 bg-slate-500 text-white cursor-pointer">
                                    {answer}
                                </label>
                            </div>
                        ))}
                        <button className="mt-4 w-28 bg-blue-500 text-white p-1 mx-auto rounded transition hover:bg-blue-600">Next</button>
                    </form>
                </div>
            )}
        </div>
    );
}
