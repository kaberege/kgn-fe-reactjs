import { create } from "zustand";

const useQuizStore = create(set => ({
    quizState: "start",
    setQuizState: (newState) => set({ quizState: newState }),
    quizChoices: {},
    setQuizChoices: (choice) => set(({quizChoices: choice}))

}));

export default useQuizStore;