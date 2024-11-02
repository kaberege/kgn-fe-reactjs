import React from 'react'
import devLaptop from "../assets/devLaptop.jpg";
import profile from "../assets/kgn-g1.jpg";

const Welcome = ({mode}) => {
    return (
        <>
            <section className={`h-screen w-full flex flex-col ${!mode ? "bg-light-gradient" : "bg-dark-gradient"} transition-colors duration-300`}>
                <div className='flex flex-col w-full max-sm:px-4 max-xl:px-10 max-w-6xl mx-auto'>
                    <h1 className='text-4xl max-sm:text-3xl  md:text-5xl font-bold mt-9 dark:text-white transition-colors duration-300'>
                        Hello, I'm <span className="text-yellow-600 dark:text-yellow-300">Kaberege Godard Nestor,</span>
                    </h1>
                    <p className='text-2xl max-sm:text-xl  font-semibold dark:text-white mt-5 transition-colors duration-300'>
                        A creative software developer dedicated to crafting dynamic web applications.
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
        </>
    )
}

export default Welcome