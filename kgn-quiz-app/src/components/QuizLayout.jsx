import React from "react";
import QuizStart from "./QuizStart";
import QuestionCard from "./QuestionCard";
import ScoreSummary from "./ScoreSummary";
import useQuizStore from "../stateStore/QuizStore";

// Main layout component that renders different quiz states
const QuizLayout = () => {
    const currentState = useQuizStore(state => state.quizState);

    return (
        <div className="max-w-2xl mx-auto max-sm:px-0 p-5">
            {currentState === "start" && <QuizStart />}
            {currentState === "quiz" && <QuestionCard />}
            {currentState === "score" && <ScoreSummary />}
        </div>
    );
}

export default QuizLayout;
