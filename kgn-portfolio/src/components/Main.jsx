import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { FiPlay } from 'react-icons/fi';
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";

const Main = () => {
    return (
        <main>
            <div className='max-w-7xl mx-auto max-sm:px-3 sm:px-10 py-5 flex flex-col gap-16 '>
                <section >
                    <h2 className='text-4xl max-sm:text-2xl font-bold mb-5'>About Me</h2>
                    <p
                        className='max-w-4xl text-lg mb-10'
                    >
                        I am a skilled software developer with experience in JavaScript and TypeScript, as well as expertise in the React.js framework. A quick learner, I collaborate closely with clients to create efficient, scalable, and user-friendly solutions that address real-world problems. Let’s work together to bring your ideas to life!
                    </p>
                    <div className='flex flex-row flex-wrap justify-center w-full sm:max-w-4xl xl:max-w-7xl mx-auto gap-12'>
                        <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                            <FaReact className='font-bold text-4xl animate-bounce' />
                            <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                                <span>React</span> <span>Developer</span>
                            </p>
                        </div>
                        <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                            <TbBrandJavascript className='font-bold text-4xl animate-bounce' />
                            <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                                <span>JavaScript</span> <span>Developer</span>
                            </p>
                        </div>
                        <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400   max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                            <TbBrandTypescript className='font-bold text-4xl animate-bounce' />
                            <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'
                            ><span>TypeScript</span> <span>Developer</span>
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className='text-4xl max-sm:text-2xl font-bold mb-5'>Projects</h2>
                    <p
                        className='max-w-4xl text-lg mb-10'
                    >
                        The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with various technologies, and manage projects effectively.
                    </p>
                    <div className='flex flex-row flex-wrap justify-center gap-6  mx-auto w-full sm:max-w-4xl xl:max-w-7xl'>
                        <div className='flex flex-col gap-4 w-full max-sm:max-w-80 sm:w-96 p-4 bg-slate-500 rounded-2xl'>
                            <div
                                style={{ backgroundImage: `url(${quiz})` }}
                                className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                    <FiPlay className='text-red-700' />
                                </div>
                            </div>
                            <h3 className='text-xl font-semibold'>Quiz App</h3>
                            <p>
                                Transforming the learning experience with an interactive quiz app that offers personalized assessments and progress tracking. Built on a user-friendly platform using React, JavaScript, and Tailwind CSS, it provides a seamless gateway to engaging and effective learning.

                            </p>
                            <p>
                                <span>#React JS</span>
                                <span>#Tailwind CSS</span>
                            </p>
                        </div>
                        <div className='flex flex-col gap-4 w-full max-sm:max-w-80 sm:w-96  p-4 bg-slate-500 rounded-2xl'>
                            <div
                                style={{ backgroundImage: `url(${tenzy})` }}
                                className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                    <FiPlay className='text-red-700' />
                                </div>
                            </div>
                            <h3 className='text-xl font-semibold'>Tenzies Game App</h3>
                            <p>
                                Revolutionizing casual gaming with a fun and interactive Tenzies game app. Developed using React and CSS, this user-friendly platform offers an engaging experience while tracking player progress and providing hours of entertainment.
                            </p>
                            <p>
                                <span>#React JS</span>
                                <span>#CSS</span>
                            </p>
                        </div>
                        <div className='flex flex-col gap-4 w-full max-sm:max-w-80 sm:w-96 p-4 bg-slate-500 rounded-2xl'>

                            <div
                                style={{ backgroundImage: `url(${vanilla})` }}
                                className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 shadow-xl absolute right-3 top-10'>
                                    <FiPlay className='text-red-700' />
                                </div>
                            </div>

                            <h3 className='text-xl font-semibold'>Vanilla JS Website</h3>
                            <p>
                                Showcasing the power of simplicity, this website is built using vanilla JavaScript and CSS. It provides an intuitive and responsive user experience, serving as a digital gateway to information and features without the complexity of frameworks.
                            </p>
                            <p>
                                <span>#Vanilla JS</span>
                                <span>#CSS</span>

                            </p>
                        </div>
                    </div>
                </section>
            </div>

        </main>
    )
}

export default Main