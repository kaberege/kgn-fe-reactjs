import React, { useEffect, useState } from "react";
import { quizCategory, hardQuiz, mediumQuiz } from "../services/quizSercice";
import "../index.css";

export default function QuizStart() {
    const [questions, setQuestions] = useState([]);
    const [hard, setHard] = useState([]);
    const [choice, setChoice] = useState({
        difficulty: "",
        category: "",
        number: ""
    })


    useEffect(() => {
        handleRequest();
    }, []);

    const handleRequest = async () => {
        try {
            const responsei = await quizCategory();
            //const hard = await hardQuiz();
            setHard(hard.results)
           // const medium = await mediumQuiz();
            console.log(responsei);
            //console.log(medium);
            setQuestions(responsei);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Too many requests. Please try again later.');
                // Optionally, implement a retry mechanism or user feedback
            } else {
                console.error('An error occurred:', error);
            }
        }

    }


    function handleChange(e) {
        console.log(e.target)
        const { value, name } = e.target;
        setChoice(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            <div>Quiz start</div>
            {/*p>{hard[0].category}</p> */}
            <form>
                <div>
                    <label htmlFor="category">Select quiz category</label>
                    <select
                        id="category"
                        value={choice.category}
                        name="category"
                        onChange={handleChange}
                        className="border"
                    >
                        {questions.map(item => (
                            <option value={item.name} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty">Select quiz difficulty</label>
                    <select
                        id="difficulty"
                        value={choice.difficulty}
                        name="difficulty"
                        onChange={handleChange}
                        className="border"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="number">Select number of Questions</label>
                    <input
                        id="number"
                        type="text"
                        value={choice.number}
                        name="number"
                        onChange={handleChange}
                        className="border"
                    />
                </div>

            </form>
        </div>
    );
}