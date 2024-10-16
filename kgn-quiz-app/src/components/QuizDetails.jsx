import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import he from "he";

export default function QuizDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        const historyDetails = JSON.parse(localStorage.getItem("history")) || [];           // Fetching quiz history from local storage
        const currentDetails = historyDetails.find(item => item.id === parseInt(id)) || {};  // Filtering the matching quiz
        setDetails(currentDetails);                                                          // Updating displayable quiz
    }, [id]);

    const formatTimeSpent = ({ hours, minutes, seconds }) => {
        return `${hours}:${minutes}:${seconds}`;                  // Displaying time taken to complete the quiz
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                to="/history"
                className="text-sm font-semibold text-cyan-600 hover:underline hover:text-cyan-300 transition duration-300 ease-in-out p-2 rounded hover:bg-cyan-800"
            >
                Back to history
            </Link>
            <div className="mt-5 max-sm:p-2 p-4 border rounded shadow-md bg-gray-800 text-gray-200">
                {Object.keys(details).length === 0 ? (
                    <p className="text-center text-red-500">Sorry! No matching details</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">{he.decode(details.topic)}</h2>
                        <p><strong>Level:</strong> {details.level}</p>
                        <p><strong>Correct Answers:</strong> {details.correct} out of {details.questions}</p>
                        <p><strong>Score:</strong> {details.scored}%</p>
                        <p><strong>Time Spent:</strong> {formatTimeSpent(details.spent)}</p>
                        <p><strong>Date:</strong> {details.date}</p>

                        <h3 className="mt-5 text-xl font-semibold">Questions:</h3>
                        <div className="mt-2">
                            {details.details.map((item, index) => (
                                <div key={index} className="mb-4 max-sm:p-2 p-3 border rounded bg-gray-700">
                                    <p className="font-medium">{index + 1}. {he.decode(item.question)}</p>
                                    <p className="mt-1"><strong>Your Answer:</strong> {he.decode(item.choosed)}
                                        {item.choosed === item.correct ? (
                                            <span className="text-green-400"> (Correct)</span>
                                        ) : (
                                            <span className="text-red-400"> (Incorrect)</span>
                                        )}
                                    </p>
                                    <p className="mt-2"><strong>Options:</strong></p>
                                    <ul className="list-disc list-inside">
                                        {item.options.map((option, idx) => (
                                            <li key={idx} className={`p-1 ${option === item.correct ? 'text-green-300' : 'text-gray-300'}`}>
                                                {he.decode(option)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
