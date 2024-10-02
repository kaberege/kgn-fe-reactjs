import { create } from "zustand";

const useQuizStore = create(set => ({
    quizState: "start",
    setQuizState: (newstate) => set({ quizState: newstate }),
    quizChoices: {},
    setQuizChoices: (choice) => set({ quizChoices: choice }),
    quizScore: {},
    setQuizScore: (score) => set({ quizScore: score }),
    myQuiz: [],
    setMyQuiz: (newquiz) => set({ myQuiz: newquiz }),
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
           filterHistory: filtered.length > 0? filtered: [{topic: "No mathces found"}]  // default value if no matches
        };
    }),

}));

export default useQuizStore;