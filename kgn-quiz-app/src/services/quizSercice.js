import axios from "axios"

export const quizCategory = async () => {
    const category = await axios.get("https://opentdb.com/api_category.php");
    //console.log(reponse.data);
    return category.data.trivia_categories;
}

export const hardQuiz = async () => {
    const hard = await axios.get("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple");
   // console.log(hard.data);
    return hard.data;
}

export const mediumQuiz = async () => {
    const medium = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple");
    //console.log(reponse.data);
    return medium.data;
}

//export {quizData}