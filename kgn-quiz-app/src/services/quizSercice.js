import axios from "axios";

// Fetches quiz categories from the Open Trivia Database
export const fetchCategory = async () => {
  const category = await axios.get("https://opentdb.com/api_category.php");
  return category.data.trivia_categories;
};

// Fetches quiz questions based on selected parameters
export const fetchQuestions = async (amount, category, difficulty) => {
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  return response.data.results;
};
