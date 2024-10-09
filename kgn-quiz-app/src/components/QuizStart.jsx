import React, { useEffect, useState } from "react";
import { FaRedo } from "react-icons/fa";
import { fetchCategory } from "../services/quizSercice";
import useQuizStore from "../stateStore/QuizStore";
import { Link } from "react-router-dom";

// Component for starting the quiz by selecting options
export default function QuizStart() {
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizChoices = useQuizStore(state => state.setQuizChoices);
    const setQuizLoader = useQuizStore(state => state.setQuizLoader);
    const setMyQuiz = useQuizStore(state => state.setMyQuiz);
    const [quizCategories, setQuizCategories] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [choice, setChoice] = useState({
        difficulty: "choose",
        category: "choose",
        number: "",
    });

    // Fetch quiz categories on component mount
    useEffect(() => {
        handleRequest();
    }, []);

    //Actual fetch function
    const handleRequest = async () => {
        setLoadError("");
        setLoading(true);
        try {
            const categories = await fetchCategory();
            setQuizCategories(categories);
        } catch (error) {
            setLoadError("Failed to fetch quiz categories.");
        } finally {
            setLoading(false);
        }
    };

    //Function that update user selected quiz parameters
    const handleChange = (e) => {
        const { value, name } = e.target;
        setChoice(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //Function for triggering quiz fetch action
    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        const errors = {};
        if (choice.difficulty === "choose") errors.difficulty = "Difficulty is required";
        if (choice.category === "choose") errors.category = "Category is required";
        if (!choice.number) errors.number = "Number of questions is required";
        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setMyQuiz([]);
            setQuizLoader(true);
            setQuizChoices(choice);
            setQuizState("quiz");
            setError({});
            setQuizCategories([]);
        }
    };

    return (
        <div className="max-sm:p-0 p-5 text-center">
            <h2 className="max-md:text-xl text-2xl font-semibold mb-4">Start Your Quiz</h2>
            {loading && <p>Loading categories<span className="animate-ping">...</span></p>}
            <div>
                {loadError && <p className="text-red-500 mt-10">{loadError}</p>}
                {loadError && (
                    <button onClick={handleRequest} className="flex items-center mx-auto underline mt-3 text-blue-500 transition hover:text-blue-300">
                        <FaRedo className="text-sm mr-1" />
                        Retry
                    </button>
                )}
            </div>
            {quizCategories.length > 0 && (
                <div>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div>
                            <label htmlFor="category" className="block mb-1">Select Quiz Category</label>
                            <select
                                id="category"
                                value={choice.category}
                                name="category"
                                onChange={handleChange}
                                className={`border-2 max-sm:max-w-48 rounded p-1 ${error.category ? "border-red-600" : "border-stone-500"}`}
                            >
                                <option value="choose" className="text-center">Choose category...</option>
                                {quizCategories.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {error.category && <p className="text-red-600">{error.category}</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="difficulty" className="block mb-1">Select Quiz Difficulty</label>
                            <select
                                id="difficulty"
                                value={choice.difficulty}
                                name="difficulty"
                                onChange={handleChange}
                                className={`border-2  rounded p-1 ${error.difficulty ? "border-red-600" : "border-stone-500"}`}
                            >
                                <option value="choose">Choose...</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            {error.difficulty && <p className="text-red-600">{error.difficulty}</p>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="number" className="block mb-1">Select Number of Questions</label>
                            <input
                                id="number"
                                type="number"
                                value={choice.number}
                                name="number"
                                onChange={handleChange}
                                placeholder="Number of questions"
                                min={1}
                                className={`border-2  max-sm:max-w-48 rounded p-1 ${error.number ? "border-red-600" : "border-stone-500"}`}
                            />
                            {error.number && <p className="text-red-600">{error.number}</p>}
                        </div>
                        <button type="submit" className="mt-4 bg-blue-500 text-white p-1 w-28 rounded transition hover:bg-blue-600">Start Quiz</button>
                    </form>
                </div>
            )}
        </div>
    );
}
