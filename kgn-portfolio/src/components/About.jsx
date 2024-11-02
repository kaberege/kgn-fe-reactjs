import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";

export default function About() {
    return (
        <>
            <section id="about">
                <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100 transition-colors duration-300'>About Me</h2>
                <p
                    className='max-w-4xl text-lg mb-10 dark:text-stone-100 transition-colors duration-300 '
                >
                    I am a proficient software developer experienced in JavaScript and TypeScript, with a strong focus on the React.js framework. As a fast learner, I work closely with clients to develop efficient, scalable, and user-friendly solutions that tackle real-world challenges. I look forward to collaborating with you to bring your ideas to fruition!
                </p>
                <div className='dark:text-stone-100 flex flex-row flex-wrap justify-center w-full sm:max-w-4xl xl:max-w-7xl mx-auto gap-12'>
                    <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 '>
                        <FaReact className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200' />
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                            <span>React</span> <span>Developer</span>
                        </p>
                    </div>
                    <div className='dark:text-stone-100 flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 '>
                        <TbBrandJavascript className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200' />
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                            <span>JavaScript</span> <span>Developer</span>
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400   max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 '>
                        <TbBrandTypescript className='font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200 transition-colors duration-300' />
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'
                        ><span>TypeScript</span> <span>Developer</span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
