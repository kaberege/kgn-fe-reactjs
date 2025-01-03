import React from 'react';
import { FaReact, FaPython } from "react-icons/fa";
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb";

export default function About() {

    const style = "font-bold text-4xl animate-bounce text-blue-950 dark:text-blue-200";

    const about = [
        {
            icon: <FaReact className={style} />,
            skill: "React"
        },
        {
            icon: <TbBrandJavascript className={style} />,
            skill: "JavaScript"
        },
        {
            icon: <TbBrandTypescript className={style} />,
            skill: "TypeScript"
        },
        {
            icon: <FaPython className={style} />,
            skill: "Django"
        }

    ];

    return (
        <>
            <section id="about">
                <h2 className='text-4xl max-sm:text-2xl font-bold mb-5 dark:text-stone-100 transition-colors duration-300'>About Me</h2>
                <p
                    className='max-w-4xl text-lg mb-10 dark:text-stone-100 transition-colors duration-300 '
                >
                    I’m a skilled software developer with expertise in JavaScript, TypeScript, and React.js for building dynamic front-end applications. Additionally, I have strong experience with Python, particularly in backend development using Django and Django REST Framework (DRF), where I focus on creating scalable, secure, and efficient APIs. As a quick learner, I am passionate about collaborating with stakeholders and understanding user needs to craft intuitive solutions that solve real-world problems. I’m excited to bring your ideas to life with efficient and impactful software solutions.
                </p>
                <div className='dark:text-stone-100 flex flex-row flex-wrap justify-center w-full sm:max-w-4xl xl:max-w-7xl mx-auto gap-12'>
                    {
                        about.map((value, index) => (
                            <div key={index} className='flex flex-col items-center justify-center cursor-pointer border-2 border-x-indigo-800 border-y-yellow-400  max-sm:mx-auto bg-blue-400 w-full max-sm:max-w-96 max-sm:h-64 sm:w-64 sm:h-72 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 '>
                                {value.icon}
                                <p className='flex flex-col items-center justify-center font-semibold text-xl sm:text-2xl mt-7'>
                                    <span>{value.skill}</span> <span>Developer</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}
