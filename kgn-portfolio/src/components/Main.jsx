import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";
import { FiPlay } from 'react-icons/fi';
import quiz from "../assets/quiz-project.jpg";
import tenzy from "../assets/tenzy-project.jpg";
import vanilla from "../assets/web-project.jpg";
import devLaptop from "../assets/devLaptop.jpg";
import profile from "../assets/kgn-g1.jpg";

const Main = () => {
    return (
        <main>
            <section className='h-screen w-full flex flex-col bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:bg-gradient-to-r dark:from-blue-900 dark:via-purple-900 dark:to-pink-900'>
                <div className='flex flex-col w-full max-sm:px-4 max-xl:px-10 max-w-6xl mx-auto'>
                    <h1
                        className='text-4xl max-sm:text-3xl font-bold mt-9'
                    >
                        <span>Hi, I'am</span> <span>Kaberege Godard Nestor</span>
                    </h1>
                    <p className='text-2xl max-sm:text-xl font-semibold flex flex-col mt-5'>
                        <span>Innovative Software Developer,</span>
                        <span>building web applications.</span>
                    </p>
                </div>
                <div className="flex items-center justify-center flex-grow">
                    <div className='w-full max-sm:h-40 max-sm:max-w-96 sm:max-w-xl sm:h-80 relative'>
                        <img
                            src={devLaptop}
                            alt="Dev machine"
                            className='rounded-lg w-full h-full'
                        />
                        <div
                            className='absolute max-sm:top-3 max-sm:left-1/3 sm:top-5 sm:left-1/3 flex items-center justify-center max-sm:w-20 max-sm:h-20 w-40 h-40 '
                        >
                            <img
                                src={profile}
                                alt="kgn profile"
                                className='w-full h-full rounded-full cursor-pointer hover:scale-105 transition-transform duration-300'
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className=' max-w-7xl mx-auto max-sm:px-3 sm:px-14 flex flex-col gap-20'>
                <section>
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
                    <div className='flex flex-row flex-wrap justify-center gap-6 xl:grid xl:grid-cols-3'>
                        <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-500 rounded-2xl'>
                            <div
                                title='Click to open'
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
                        <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto  p-4 bg-slate-500 rounded-2xl'>
                            <div
                                title='Click to open'
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
                        <div className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-500 rounded-2xl'>

                            <div
                                title='Click to open'
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
                <section>
                    <div></div>
                    <div className='xl:w-96 bg-slate-400 p-6 rounded-3xl'>
                        <h2 className='text-4xl max-sm:text-2xl font-bold mb-5'>Contact Me</h2>
                        <form
                            className='flex flex-col gap-6 '
                        >
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="What's your good name?"
                                    maxLength={25}
                                    className='border rounded-md p-1'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="What's your web adress?"
                                    maxLength={25}
                                    className='border rounded-md p-1'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="text">Your Message</label>
                                <textarea
                                    name="text"
                                    id="text"
                                    rows={5}
                                    cols={30}
                                    placeholder="What do you want to say?"
                                    className='border rounded-md p-1'
                                />
                            </div>
                            <button className='border rounded-md w-16 p-1'>Send</button>
                        </form>
                    </div>
                </section>
                <div className='fixed bottom-4 left-2 z-50 hover:scale-105 transition duration-300 '>
                    <div className='w-24 h-24 relative'>
                        <div className='w-full h-full absolute animate-spin flex items-center justify-center border-t-4 border-blue-500 rounded-full'>

                        </div>
                        <a href='mailto:kabgnestor@gmail.com'
                            className='text-sm absolute left-4 top-4 w-16 h-16  flex items-center justify-center bg-gradient-to-b from-slate-400 via-orange-500 to-green-900 rounded-full font-semibold'
                        >
                            Hire Me
                        </a>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main