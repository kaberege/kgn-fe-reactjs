import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaPrint } from "react-icons/fa";
import he from "he";
import html2canvas from 'html2canvas';
import logoUrl from "../assets/logo-png1.png";


export default function QuizDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const print = useRef();

    useEffect(() => {
        const historyDetails = JSON.parse(localStorage.getItem("history")) || [];           // Fetching quiz history from local storage
        const currentDetails = historyDetails.find(item => item.id === parseInt(id)) || {};  // Filtering the matching quiz
        setDetails(currentDetails);                                                          // Updating displayable quiz
    }, [id]);

    const formatTimeSpent = ({ hours, minutes, seconds }) => {
        return `${hours}:${minutes}:${seconds}`;                  // Displaying time taken to complete the quiz
    };

    // Function for printing quiz details
    function handlePrint() {
        const newDocument = document.createElement("div");
        newDocument.style.position = "fixed";
        newDocument.style.right = "-50%";

        const wrapper = document.createElement("div");   // A wrapper div with a constant width of 500px
        wrapper.innerHTML = `<img src="${logoUrl}" alt="Logo" style="width: 80px; height:60px; margin-bottom: 10px; border-radius: 50%; margin: 0 auto" />`
        wrapper.style.width = '500px';
        wrapper.style.margin = '0 auto';

        wrapper.appendChild(print.current.cloneNode(true));  // Appending the current print ref content to the wrapper
        newDocument.appendChild(wrapper);                    // Appending the wrapper to the newDocument
        document.body.appendChild(newDocument);              // Appending the newDocument into the body

        html2canvas(newDocument).then(canvas => {
            const element = document.createElement("a");
            element.href = canvas.toDataURL("image/png");
            element.download = "Quiz results.png";
            element.click();
            document.body.removeChild(newDocument); // Clean up the newDocument from the body
        });
    }


    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <Link
                    to="/history"
                >
                    <button className='flex items-center justify-center text-sm font-semibold text-cyan-600 hover:underline hover:text-cyan-300 transition duration-300 ease-in-out p-2 rounded hover:bg-cyan-800'>

                        <FaAngleDoubleLeft className='mr-1' />
                        Back
                    </button>
                </Link>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 cursor-pointer bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out text-sm p-1 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <FaPrint />
                    Print
                </button>

            </div>
            <div
                ref={print}
                className="mt-5 max-sm:p-2 p-4 border rounded shadow-md bg-gray-800 text-gray-200"
            >
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
