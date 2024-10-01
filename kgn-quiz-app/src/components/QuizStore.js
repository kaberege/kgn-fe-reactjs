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
    setQuizLoader: (value)=> set({quizLoader: value}),
    quizHistory: [],
    setQuizHistory: ()=> set(state=>({quizHistory:[...state.quizHistory, state.quizScore]})),

}));

export default useQuizStore;