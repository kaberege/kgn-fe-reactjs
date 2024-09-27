import { create } from "zustand";

const useQuizStore = create(set => ({
    quizState: "start",
    setQuizState: (newState) => set({ quizState: newState }),
    quizChoices: {},
    setQuizChoices: (choice) => set({ quizChoices: choice }),
    quizScore: 0,
    setQuizScore: (score) => set({ quizScore: score }),

}));

export default useQuizStore;