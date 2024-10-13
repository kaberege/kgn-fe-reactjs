import React, { useEffect } from "react";
import { FaAngleDoubleLeft, FaDownload, FaShare } from "react-icons/fa";
import html2canvas from "html2canvas";
import useQuizStore from "../stateStore/QuizStore";
import SearchingBar from "./SearchingBar";

// Displays quiz history and allows searching
export default function History() {

    const quizHistory = useQuizStore(state => state.quizHistory);
    const setQuizHistory = useQuizStore(state => state.setQuizHistory);
    const displayHistory = useQuizStore(state => state.displayHistory);
    const setDisplayHistory = useQuizStore(state => state.setDisplayHistory);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("history")) || [] //Retrieve history from local storage
        setQuizHistory(storedHistory);         //Update quiz history
    }, []);

    useEffect(() => {
        setDisplayHistory(quizHistory);     //Update displayed history
    }, [quizHistory]);

    //Function for downloading individual quiz history
    const downloadIndividualResult = (item) => {
        const element = document.createElement("div");
        element.style.width = "320px";
        element.style.height = "200px";
        element.style.padding = "20px";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "8px";
        element.style.backgroundColor = "#f9f9f9";
        element.style.fontFamily = "Arial, sans-serif";
        element.style.color = "#333";
        element.innerHTML = `
            <h2>Topic: <strong>${item.topic}</strong></h2>
            <h3>Difficulty: ${item.level}</h3>
            <p>Score: ${item.scored}%</p>
            <p>Time taken: ${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}</p>
            <p>Date: ${item.date}</p>
        `;
        document.body.appendChild(element);
        html2canvas(element).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `${item.topic}_result.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.removeChild(element);
        });
    }

    //Function to share the results to social media platforms
    const generateCanvasAndShare = async (item) => {
        const element = document.createElement('div');
        element.style.padding = "20px";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "8px";
        element.style.backgroundColor = "#f9f9f9";
        element.style.fontFamily = "Arial, sans-serif";
        element.style.color = "#333";

        element.innerHTML = `
            <h2>Topic: <strong>${item.topic}</strong></h2>
            <h3>Difficulty: ${item.level}</h3>
            <p>Score: ${item.scored}%</p>
            <p>Time taken: ${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}</p>
            <p>Date: ${item.date}</p>
        `;

        document.body.appendChild(element);

        const canvas = await html2canvas(element);
        const imageDataUrl = canvas.toDataURL('image/png');

        document.body.removeChild(element); // Clean up

        // Share the image
        try {
            await navigator.share({
                title: `Quiz Result: ${item.topic}`,
                text: `Check out my quiz result!`,
                files: [
                    new File([await fetch(imageDataUrl).then(res => res.blob())], `${item.topic}_result.png`, { type: 'image/png' })
                ],
            });
            console.log('Result shared successfully!');
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="max-sm:p-0 p-5 mt-16">
            <h2 className="max-md:text-xl text-2xl text-center font-semibold mb-4 dark:text-white">Quiz History</h2>
            {displayHistory.length > 0 && displayHistory[0].topic === "No matches found" && (
                <button
                    className="flex items-center max-sm:p-1 px-4 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition duration-200"
                    onClick={() => setDisplayHistory(quizHistory)}
                >
                    <FaAngleDoubleLeft className="mr-2 max-sm:mr-1 text-xl" />
                    Full history
                </button>
            )}
            <SearchingBar />
            <div className="mt-4">
                {displayHistory.length === 0 && <p className="text-center dark:text-slate-300">History will be displayed here.</p>}
                {displayHistory.length > 0 && displayHistory[0].topic === "No matches found" && (
                    <p className="text-red-500 text-center dark:text-slate-300">{displayHistory[0].topic}</p>
                )}
                <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto mt-12">
                    {displayHistory.length > 0 && displayHistory[0].topic !== "No matches found" &&
                        displayHistory.map(item => (
                            <div key={item.id} className="border w-full rounded p-4 mb-4 bg-gray-200 shadow cursor-pointer transition duration-300 hover:scale-105 dark:bg-stone-700 dark:text-slate-300">
                                <h2>Topic: <span className="font-bold">{item.topic}</span></h2>
                                <h3 className="text-gray-700 dark:text-gray-500">Difficulty: {item.level}</h3>
                                <p>Score: {item.scored}%</p>
                                <p>Time taken: {`${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}`}</p>
                                <p>Date: {item.date}</p>
                                <div className="flex gap-2 mt-2 float-end text-sm">
                                    <button onClick={() => downloadIndividualResult(item)} className="flex items-center bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition">
                                        <FaDownload className="mr-2" /> Download
                                    </button>
                                    <button onClick={() => generateCanvasAndShare(item)} className="flex items-center bg-green-500 text-white p-1 rounded hover:bg-green-600 transition">
                                        <FaShare className="mr-2" /> Share
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
