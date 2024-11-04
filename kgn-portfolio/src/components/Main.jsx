
import React from 'react';
import Welcome from './Welcome';
import About from './About';
import Project from './Project';
import Contact from './Contact';

const Main = ({ mode }) => {


    return (
        <main>
            <Welcome mode={mode} />
            <div className={`${mode ? "bg-slate-900" : "light"} pt-6 transition-colors duration-300`}>
                <div className=' max-w-7xl mx-auto max-sm:px-3 sm:px-14 flex flex-col gap-20 pb-10'>
                    <About />
                    <Project />
                    <Contact />
                    <div className='max-sm:hidden fixed bottom-4 left-2 z-50 hover:scale-105 transition duration-300 '>
                        <div className='w-24 h-24 relative'>
                            <div className='w-full h-full absolute animate-spin flex items-center justify-center border-t-4 border-blue-500 rounded-full'>

                            </div>
                            <a href='mailto:kabgnestor@gmail.com'
                                className='text-sm absolute left-4 top-4 w-16 h-16  flex items-center justify-center bg-gradient-to-b from-slate-400 via-orange-500 to-green-800 rounded-full font-semibold'
                            >
                                Hire Me
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </main >
    )
}

export default Main


