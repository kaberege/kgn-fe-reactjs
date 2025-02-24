import axios from "axios"

const fetchRecipes = async (term:string) => {
    //const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    console.log(response.data.meals);
    console.log(Object.keys(response.data.meals));
    return response.data.meals;
}

export default fetchRecipes;