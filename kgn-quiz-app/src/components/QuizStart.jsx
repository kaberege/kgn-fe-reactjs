import React, { useEffect, useState } from "react";
import { fetchCategory } from "../services/quizSercice";
import "../index.css";
import useQuizStore from "./QuizStore";

export default function QuizStart() {
    const setQuizState = useQuizStore(state => state.setQuizState);
    const setQuizChoices = useQuizStore(state => state.setQuizChoices);
    const [quizCategories, setQuizCategories] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    const [choice, setChoice] = useState({
        difficulty: "medium",
        category: "9",
        number: "",
    })

    useEffect(() => {
        handleRequest();
    }, []);

    const handleRequest = async () => {
        setLoading(true);
        try {
            const categories = await fetchCategory();
            setQuizCategories(categories);

        } catch (error) {
            setLoadError("Failed to fetch quiz form! Please reload the page.")
        } finally {
            setLoading(false);
        }

    }


    function handleChange(e) {
        const { value, name } = e.target;
        setChoice(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = {};
        if (!choice.difficulty) errors.difficulty = "Difficulty is required";
        if (!choice.category) errors.category = "Category is required";
        if (!choice.number) errors.number = "Number of questions is required";
        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setQuizState("quiz");
            setQuizChoices(choice);
            setError({});
        }

    }

    return (
        <div>
            <div>Quiz start</div>
            {loading && <p>Loading....</p>}
            {loadError && <p className="mt-4 text-red-500">{loadError}</p>}
            {quizCategories.length > 0 &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="category">Select quiz category</label>
                        <select
                            id="category"
                            value={choice.category}
                            name="category"
                            onChange={handleChange}
                            className={`border ${error.category && "border-red-600"}`}
                        >
                            {quizCategories.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {error.category && <p className={`${error.category && "text-red-600"}`}>{error.category}</p>}
                    </div>
                    <div>
                        <label htmlFor="difficulty">Select quiz difficulty</label>
                        <select
                            id="difficulty"
                            value={choice.difficulty}
                            name="difficulty"
                            onChange={handleChange}
                            className={`border ${error.difficulty && "border-red-600"}`}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        {error.difficulty && <p className={`${error.difficulty && "text-red-600"}`}>{error.difficulty}</p>}
                    </div>
                    <div>
                        <label htmlFor="number">Select number of Questions</label>
                        <input
                            id="number"
                            type="number"
                            value={choice.number}
                            name="number"
                            onChange={handleChange}
                            placeholder="Number of questions"
                            className={`border ${error.number && "border-red-600"}`}
                        />
                        {error.number && <p className={`${error.number && "text-red-600"}`}>{error.number}</p>}
                    </div>
                    <button
                        type="submit"
                        className="border bg-slate-600 rounded-lg p-3"
                    >Start quiz</button>

                </form>
            }
        </div>
    );
}