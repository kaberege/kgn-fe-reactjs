
import React, { useState, useEffect } from 'react';
import '../index.css';
import data from "../data.json"

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    console.log(recipes)

    useEffect(() => {
        setRecipes(data)
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Recipe Sharing Platform</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map(recipe => (
                    <div
                     key={recipe.id} 
                     className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl text-center"
                     >
                        <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover"/>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                            <p className="text-gray-600">{recipe.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
