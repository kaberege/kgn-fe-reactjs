import React from 'react';
import { FiPlay } from 'react-icons/fi';
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";

function Project() {
    return (
        <>
            <section id="projects">
                <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100 transition-colors duration-300'>Projects</h2>
                <p
                    className='max-w-4xl text-lg mb-10 dark:text-stone-100 transition-colors duration-300'
                >
                    The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with various technologies, and manage projects effectively.
                </p>
                <div className='flex flex-row flex-wrap justify-center gap-6 xl:grid xl:grid-cols-3'>
                    <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl transition-colors duration-300'>
                        <a href="https://kgn-fe-reactjs.vercel.app/" target='_blank'
                            title='Click to open'
                            style={{ backgroundImage: `url(${quiz})` }}
                            className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                            <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 hover:bg-slate-600 shadow-xl absolute right-3 top-10 transition-colors duration-300'>
                                <FiPlay className='text-red-500 hover:text-red-700 transition-colors duration-300' />
                            </div>
                        </a>
                        <h3 className='text-xl font-semibold dark:text-stone-100 transition-colors duration-300'>Quiz App</h3>
                        <p className='dark:text-stone-100 transition-colors duration-300'>
                            Transforming the learning experience with an interactive quiz app that offers personalized assessments and progress tracking. Built on a user-friendly platform using React, JavaScript, and Tailwind CSS, it provides a seamless gateway to engaging and effective learning.

                        </p>
                        <p className='flex gap-1 text-gray-800 dark:text-gray-200'>
                            <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1  rounded-full transition-colors duration-300'>#React JS</span>
                            <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1 rounded-full transition-colors duration-300'>#Tailwind CSS</span>
                        </p>
                    </div>
                    <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto  p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl transition-colors duration-300'>
                        <a href="https://kgn-fe-reactjs-zrvz.vercel.app/" target='_blank'
                            title='Click to open'
                            style={{ backgroundImage: `url(${tenzy})` }}
                            className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                            <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400  hover:bg-slate-600  shadow-xl absolute right-3 top-10 transition-colors duration-300'>
                                <FiPlay className='text-red-500 hover:text-red-700 transition-colors duration-300' />
                            </div>
                        </a>
                        <h3 className='text-xl font-semibold dark:text-stone-100 transition-colors duration-300'>Tenzies Game App</h3>
                        <p className='dark:text-stone-100 transition-colors duration-300'>
                            Revolutionizing casual gaming with a fun and interactive Tenzies game app. Developed using React and CSS, this user-friendly platform offers an engaging experience while tracking player progress and providing hours of entertainment.
                        </p>
                        <p className='flex gap-1 text-gray-800 dark:text-gray-200 transition-colors duration-300'>
                            <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full transition-colors duration-300'>#React JS</span>
                            <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300'>#CSS</span>
                        </p>
                    </div>
                    <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl transition-colors duration-300'>

                        <a href='https://kaberege.github.io/kgn.github.io/' target='_blank'
                            title='Click to open'
                            style={{ backgroundImage: `url(${vanilla})` }}
                            className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                            <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400  hover:bg-slate-600  shadow-xl absolute right-3 top-10'>
                                <FiPlay className='text-red-500 hover:text-red-700 transition-colors duration-300' />
                            </div>
                        </a>

                        <h3 className='text-xl font-semibold dark:text-stone-100 transition-colors duration-300'>Vanilla JS Website</h3>
                        <p className='dark:text-stone-100 transition-colors duration-300'>
                            Showcasing the power of simplicity, this website is built using vanilla JavaScript and CSS. It provides an intuitive and responsive user experience, serving as a digital gateway to information and features without the complexity of frameworks.
                        </p>
                        <p className='flex gap-1 text-gray-800 dark:text-gray-200'>
                            <span className='text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-1 rounded-full transition-colors duration-300'>
                                #Vanilla JS
                            </span>
                            <span className='text-sm bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-1  rounded-full transition-colors duration-300'>
                                #CSS
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Project