import React from 'react';
import { FiPlay } from 'react-icons/fi';
import { projects } from "../store/projects.js"

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
                    {
                        projects.map((value, index) => (
                            <div
                                key={index}
                                className='flex flex-col gap-4 w-full sm:w-96 xl:w-auto p-4 bg-slate-400 dark:bg-gray-700 shadow-md rounded-2xl transition-colors duration-300'
                            >
                                <a href={value.link.href} target='_blank'
                                    title='Click to open'
                                    style={{ backgroundImage: `url(${value.link.background})` }}
                                    className={`w-full h-60 relative max-sm:h-52 rounded-2xl cursor-pointer bg-cover bg-center bg-no-repeat`}>
                                    <div className='flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 hover:bg-slate-600 shadow-xl absolute right-3 top-10 transition-colors duration-300'>
                                        <FiPlay className='text-red-500 hover:text-red-700 transition-colors duration-300' />
                                    </div>
                                </a>
                                <h3 className='text-xl font-semibold dark:text-stone-100 transition-colors duration-300'>{value.heading}</h3>
                                <p className='dark:text-stone-100 transition-colors duration-300'>
                                    {value.description}

                                </p>
                                <p className='flex flex-wrap gap-1 text-gray-800'>
                                    {value.skills.map((skill, idx) => (
                                        <span
                                        key={idx}
                                            className={skill.class }
                                        >
                                            {skill.content }
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Project