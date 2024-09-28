import { create } from "zustand";

const useQuizStore = create(set => ({
    quizState: "start",
    setQuizState: (newstate) => set({ quizState: newstate }),
    quizChoices: {},
    setQuizChoices: (choice) => set({ quizChoices: choice }),
    quizScore: 0,
    setQuizScore: (score) => set({ quizScore: score }),
    myQuiz: [],
    setMyQuiz: (newquiz) => set({ myQuiz: newquiz }),
    time: 0,
    setTime: (newtime) => set({ time: newtime + 1 }),

}));

export default useQuizStore;