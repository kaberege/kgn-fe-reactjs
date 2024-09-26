import React from "react";
import QuizStart from "./QuizStart";
import QuestionCard from "./QuestionCard";
import useQuizStore from "./QuizStore";

const QuizLayout = () => {
    const currentState = useQuizStore(state => state.quizState)

    return (
        <div>
            <div>Quiz Layout</div>
            {currentState === "start" && <QuizStart />}
            {currentState === "quiz" && <QuestionCard />}
        </div>
    )
}

export default QuizLayout;