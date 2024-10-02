import { create } from "zustand";

// Zustand store for managing quiz-related state
const useQuizStore = create(set => ({
    quizState: "start", // Tracks the current state of the quiz
    setQuizState: (newState) => set({ quizState: newState }),
    quizChoices: {},
    setQuizChoices: (choice) => set({ quizChoices: choice }),
    quizScore: {},
    setQuizScore: (score) => set({ quizScore: score }),
    myQuiz: [],
    setMyQuiz: (newQuiz) => set({ myQuiz: newQuiz }),
    quizLoader: true,
    setQuizLoader: (value) => set({ quizLoader: value }),
    quizHistory: [],
    setQuizHistory: () => set(state => ({ quizHistory: [...state.quizHistory, state.quizScore] })),
    searchTerm: "",
    setSearchTerm: (term) => set({ searchTerm: term }),
    filterHistory: [],
    setFilterHistory: () => set(state => {
        const filtered = state.quizHistory.filter(quiz =>
            quiz.topic.toLowerCase().includes(state.searchTerm.toLowerCase()));
        return {
            filterHistory: filtered.length > 0 ? filtered : [{ topic: "No matches found" }] // Default message
        };
    }),
}));

export default useQuizStore;
