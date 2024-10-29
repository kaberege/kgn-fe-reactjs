import React, { useState } from 'react';
import logo from "../assets/logo-png2.png";
import devLaptop from "../assets/devLaptop.jpg";
import profile from "../assets/kgn-g1.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { FaBars, FaWindowClose, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";


export default function Header({ handleMode }) {
    const [hideNav, setHideNav] = useState(true); //handle navigation bar close and open

    return (
        <header className='w-full h-screen flex flex-col '>
            <nav className=' dark:bg-slate-400 bg-slate-200 sticky top-0 z-10 shadow-xl'>
                <div className=' flex flex-row max-w-7xl mx-auto p-1 sm:py-2 max-xl:px-2'>
                    <div className='flex flex-row flex-grow items-center'>
                        <img
                            src={logo}
                            alt="kgn logo"
                            title='kgn logo'
                            className='w-24 h-7 sm:w-32 sm:h-10 cursor-pointer rounded-sm' />
                        <p className='max-md:hidden'>
                            <span className='mx-3'>|</span>
                            Software developer
                        </p>
                    </div>
                    <div
                        onClick={() => setHideNav(false)}
                        className=' flex text-2xl items-center justify-center sm:hidden font-bold flex-row w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
                        <FaBars />
                    </div>
                    <div
                        style={{ transition: "right 0.8s linear" }}
                        className={`flex flex-row max-sm:flex-col shadow-lg sm:gap-10 ${hideNav ? "max-sm:-right-1/2 max-sm:overflow-hidden" : "max-sm:right-0 max-sm:w-1/2"} max-sm:h-full max-sm:fixed max-sm:top-0  max-sm:p-2 max-sm:bg-blue-600 max-sm:dark:bg-slate-600 transition-colors duration-300`}
                    >
                        <div
                            onClick={() => setHideNav(true)}
                            className=' flex text-2xl items-center justify-center ml-auto sm:hidden font-bold w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
                            <FaWindowClose />
                        </div>
                        <ul className="flex flex-row max-sm:flex-col items-center gap-3 max-sm:gap-5 max-sm:mt-8">
                            <li className='flex items-center'><a href="#about">About</a></li>
                            <li className='flex items-center'><a href="#projects">Projects</a></li>
                            <li className='flex items-center'><a href="#contact">Contact</a></li>
                            <li className='flex items-center'><a href="#resume">Resume</a></li>
                            <li className='flex items-center'>
                                <div
                                    title='Toggle light/dark mode'
                                    className={`w-7 h-4 relative bg-white rounded-full cursor-pointer flex items-center`}
                                    onClick={() => handleMode(prev => !prev)}
                                >
                                    <div className={`absolute w-3 h-3 bg-black rounded-full dark:right-0 transition duration-1000`} ></div>
                                </div>
                            </li>
                        </ul>
                        <ul className="flex items-center justify-center flex-row gap-2 max-sm:mt-8 max-sm:mb-5">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
                                    alt="LinkedIn kgn"
                                    title="kgn LinkedIn"
                                    target="_blank"
                                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                                >
                                    <FaLinkedin className='font-bold text-xl' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://discord.com/invite/Yx5CjAFM"
                                    target="_blank"
                                    alt="Discord kgn"
                                    title="kgn Discord"
                                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                                >
                                    <FaDiscord className='font-bold text-xl' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/Kaberege_gn"
                                    target="_blank"
                                    alt="Twitter kgn"
                                    title="kgn Twitter"
                                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                                >
                                    <FaXTwitter className='font-bold text-xl' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/kgn_ke_hong/"
                                    target="_blank"
                                    alt="Instagram kgn"
                                    title="kgn Instagram"
                                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                                >
                                    <FaInstagram className='font-bold text-xl' />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
            <div
                className='flex-grow w-full bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 dark:bg-gradient-to-r dark:from-blue-900 dark:via-purple-900 dark:to-pink-900'
            >
                <div className='flex flex-col w-full max-w-7xl  p-2 mx-auto' >
                    <h1
                        className='text-4xl max-sm:text-3xl font-bold mt-9'
                    >
                        <span>Hi, I'am</span> <span>Kaberege Godard Nestor</span>
                    </h1>
                    <p className='text-2xl max-sm:text-xl font-semibold flex flex-col mt-5'>
                        <span>Innovative Software Developer,</span>
                        <span>building web applications.</span>
                    </p>
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
                </div>
            </div>

        </header>
    )
}
