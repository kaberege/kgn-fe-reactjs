import React, { useEffect, useState } from "react";
import useQuizStore from "./QuizStore";
import { fetchQuestions } from "../services/quizSercice";

export default function QuestionCard() {
    const fetchChoices = useQuizStore(state => state.quizChoices);
    const [myQuiz, setMyQuiz] = useState([]);

    useEffect(() => {
        handleFetch();
    }, [])

    useEffect(() => {
        console.log(myQuiz)
    }, [myQuiz])

    const handleFetch = async () => {
        const amount = fetchChoices.number;
        const difficulty = fetchChoices.difficulty;
        const category = fetchChoices.category;
        try {
            const results = await fetchQuestions(amount, category, difficulty);
            setMyQuiz(results)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {<p>{ }</p>}
        </div>
    );
}