import {create} from "zustand";

const useQuizStore = create(set => ({
    quiz:[],
    setQuiz: (newquiz)=> set(state => ({quiz: [...state.quiz, newquiz]}))

}));

export default useQuizStore;