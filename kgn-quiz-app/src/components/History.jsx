import React, { useEffect } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import DownloadShare from "./DownloadShare";
import useQuizStore from "../stateStore/QuizStore";
import SearchingBar from "./SearchingBar";
import { Link } from "react-router";
import he from "he";

// Displays quiz history and allows searching
export default function History() {
  // localStorage.clear()
  const quizHistory = useQuizStore((state) => state.quizHistory);
  const setQuizHistory = useQuizStore((state) => state.setQuizHistory);
  const displayHistory = useQuizStore((state) => state.displayHistory);
  const setDisplayHistory = useQuizStore((state) => state.setDisplayHistory);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("historyquiz")) || []; //Retrieve history from local storage
    setQuizHistory(storedHistory); //Update quiz history
  }, []);

  useEffect(() => {
    setDisplayHistory(quizHistory); //Update displayed history
  }, [quizHistory]);

  return (
    <div className="max-sm:p-0 p-5 mt-13 w-full">
      <h2 className="max-md:text-xl text-2xl text-center font-semibold mb-4 dark:text-white">
        Quiz History
      </h2>
      {displayHistory.length > 0 &&
      displayHistory[0].topic === "No matches found" ? (
        <button
          className="flex items-center cursor-pointer max-sm:p-1 px-4 py-2 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition duration-200"
          onClick={() => setDisplayHistory(quizHistory)}
        >
          <FaAngleDoubleLeft className="mr-2 max-sm:mr-1 text-xl" />
          Full history
        </button>
      ) : (
        <div className="flex">
          <Link to="/">
            <button className="flex items-center justify-center cursor-pointer text-sm font-semibold text-cyan-600 hover:underline hover:text-cyan-300 transition duration-300 ease-in-out p-2 rounded hover:bg-cyan-800">
              <FaAngleDoubleLeft className="mr-1" />
              Back
            </button>
          </Link>
        </div>
      )}

      <SearchingBar />
      <div className="mt-4">
        {displayHistory.length === 0 && (
          <p className="text-center dark:text-slate-300">
            History will be displayed here.
          </p>
        )}
        {displayHistory.length > 0 &&
          displayHistory[0].topic === "No matches found" && (
            <p className="text-red-500 text-center dark:text-slate-300">
              {displayHistory[0].topic}
            </p>
          )}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto mt-12">
          {displayHistory.length > 0 &&
            displayHistory[0].topic !== "No matches found" &&
            displayHistory.map((item) => (
              <div
                key={item.id}
                className="border w-full rounded p-4 mb-1 bg-gray-200 shadow cursor-pointer transition duration-300 hover:scale-105 dark:bg-stone-700 dark:text-slate-300"
              >
                <h2>
                  Topic:{" "}
                  <span className="font-bold">{he.decode(item.topic)}</span>
                </h2>
                <h3 className="text-gray-700 dark:text-gray-500">
                  Difficulty: {item.level}
                </h3>
                <p>Score: {item.scored}%</p>
                <p>Time taken: {item.spent}</p>
                <p>Date: {item.date}</p>
                <p className="mt-1 mb-4">
                  <Link
                    to={`/details/${item.id}`}
                    className="text-base text-cyan-600 hover:underline hover:text-cyan-400 transition"
                  >
                    View details
                  </Link>
                </p>
                <DownloadShare shareable={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
