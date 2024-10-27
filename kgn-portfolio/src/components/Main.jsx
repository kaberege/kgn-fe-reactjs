import React from 'react';
import { FaReact } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";

const Main = () => {
    return (
        <main>
            <section className='max-w-7xl mx-auto max-sm:px-3 sm:px-10 py-5 '>
                <h2 className='text-4xl max-sm:text-2xl font-bold mb-5'>About Me</h2>
                <p
                    className='max-w-4xl text-lg mb-10'
                >
                    I'm a skilled software developer with experience in JavaScript and TypeScript, and expertise in React.Js framework. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!</p>
                <div className='flex flex-row flex-wrap justify-between w-full max-w-4xl mx-auto gap-12'>
                    <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                        <FaReact className='font-bold text-4xl animate-bounce'/>
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                            <span>React</span> <span>Developer</span>
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                        <TbBrandJavascript className='font-bold text-4xl animate-bounce'/>
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                            <span>JavaScript</span> <span>Developer</span>
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400   max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition'>
                        <TbBrandTypescript className='font-bold text-4xl animate-bounce'/>
                        <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'
                        ><span>TypeScript</span> <span>Developer</span>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main