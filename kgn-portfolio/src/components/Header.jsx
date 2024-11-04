

import React, { useState } from 'react';
import favicon from "../assets/favicon.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { FaBars, FaWindowClose, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";


export default function Header({ mode, handleMode }) {
    const [hideNav, setHideNav] = useState(true); //handle navigation bar close and open

    return (
        <header className='sticky top-0  z-10 '>
            <nav className={`${mode ? "dark-nav" : "light-nav"} shadow-md transition-colors duration-300`}>
                <div className='max-w-7xl mx-auto flex flex-row p-1 max-xl:px-2 '>
                    <div className='flex flex-row flex-grow items-center'>
                        <img
                            src={favicon}
                            alt="kgn logo"
                            title='kgn logo'
                            className='w-7 h-7 sm:w-11 sm:h-11 cursor-pointer rounded-full' />
                        <p className='max-lg:hidden dark:text-white font-bold transition-colors duration-300'>
                            <span className='mx-3'>|</span>
                            Software developer
                        </p>
                    </div>
                    <div
                        onClick={() => setHideNav(false)}
                        className=' flex text-xl items-center justify-center sm:hidden font-bold flex-row w-7 h-7 hover:bg-slate-400 rounded-full cursor-pointer' >
                        <FaBars className='dark:text-white' />
                    </div>
                    <div
                        style={{ transition: "right 0.3s linear" }}
                        className={`flex flex-row max-sm:flex-col shadow-lg sm:gap-10 ${hideNav ? "max-sm:-right-3/4 max-sm:overflow-hidden" : "max-sm:right-0 max-sm:w-1/2"} max-sm:h-full max-sm:fixed max-sm:top-0  max-sm:p-2 max-sm:bg-slate-300 max-sm:dark:bg-slate-600 transition-colors duration-300`}
                    >
                        <div
                            onClick={() => setHideNav(true)}
                            className=' flex text-xl items-center justify-center ml-auto sm:hidden font-bold w-7 h-7 hover:bg-slate-400 rounded-full cursor-pointer' >
                            <FaWindowClose className='dark:text-white' />
                        </div>
                        <ul className="flex flex-row max-sm:flex-col items-center gap-3 max-sm:gap-5 max-sm:mt-8">
                            <li className='flex items-center dark:text-white border-black dark:border-white  hover:border-b-2 dark:hover:border-b-2 font-bold transition-colors duration-300'><a href="#about">About</a></li>
                            <li className='flex items-center dark:text-white border-black dark:border-white hover:border-b-2 dark:hover:border-b-2  font-bold transition-colors duration-300'><a href="#projects">Projects</a></li>
                            <li className='flex items-center dark:text-white border-black dark:border-white hover:border-b-2 dark:hover:border-b-2  font-bold transition-colors duration-300'><a href="#contact">Contact</a></li>
                            <li className='flex items-center dark:text-white border-black dark:border-white hover:border-b-2 dark:hover:border-b-2  font-bold transition-colors duration-300'><a href="https://drive.google.com/file/d/1sJm_h0qf8al6gnfRu3pwhXnwYW9jj0os/view?usp=sharing" target='_blank'>Resume</a></li>
                            <li className='flex items-center'>
                                <div
                                    title='Toggle light/dark mode'
                                    className={`w-7 h-4 relative bg-black dark:bg-white rounded-full cursor-pointer flex items-center transition-colors duration-300`}
                                    onClick={() => handleMode(prev => !prev)}
                                >
                                    <div className={`absolute w-3 h-3 bg-white dark:bg-black rounded-full dark:right-0 transition-all duration-300`} ></div>
                                </div>
                            </li>
                        </ul>
                        <ul className="flex items-center justify-center flex-row gap-2 max-md:hidden">
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer transition-colors duration-300'>
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
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer'>
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
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer transition-colors duration-300'>
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
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer transition-colors duration-300'>
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
        </header >
    )
}


