

import React, { useState } from 'react';
import logo from "../assets/logo-png2.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaBars, FaWindowClose, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";


export default function Header({ mode, handleMode }) {
    const [hideNav, setHideNav] = useState(true); //handle navigation bar close and open

    return (
        <header className='sticky top-0  z-10 '>
            <nav className={`${mode ? "dark-nav" : "light-nav"} shadow-md`}>
                <div className='max-w-7xl mx-auto flex flex-row p-1 sm:py-2 max-xl:px-2 '>
                    <div className='flex flex-row flex-grow items-center'>
                        <img
                            src={logo}
                            alt="kgn logo"
                            title='kgn logo'
                            className='w-24 h-7 sm:w-32 sm:h-10 cursor-pointer rounded-sm' />
                        <p className='max-lg:hidden dark:text-white font-bold'>
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
                        style={{ transition: "right 0.4s linear" }}
                        className={`flex flex-row max-sm:flex-col shadow-lg sm:gap-10 ${hideNav ? "max-sm:-right-3/4 max-sm:overflow-hidden" : "max-sm:right-0 max-sm:w-1/2"} max-sm:h-full max-sm:fixed max-sm:top-0  max-sm:p-2 max-sm:bg-slate-300 max-sm:dark:bg-slate-600 transition-colors duration-300`}
                    >
                        <div
                            onClick={() => setHideNav(true)}
                            className=' flex text-2xl items-center justify-center ml-auto sm:hidden font-bold w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
                            <FaWindowClose />
                        </div>
                        <ul className="flex flex-row max-sm:flex-col items-center gap-3 max-sm:gap-5 max-sm:mt-8">
                            <li className='flex items-center dark:text-white hover:underline font-bold'><a href="#about">About</a></li>
                            <li className='flex items-center dark:text-white hover:underline font-bold'><a href="#projects">Projects</a></li>
                            <li className='flex items-center dark:text-white hover:underline font-bold'><a href="#contact">Contact</a></li>
                            <li className='flex items-center dark:text-white hover:underline font-bold'><a href="#resume">Resume</a></li>
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
                        <ul className="flex items-center justify-center flex-row gap-2 max-md:hidden">
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer'>
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
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer'>
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
                            <li className='sm:w-7 sm:h-7 sm:rounded-full sm:hover:bg-red-400 flex items-center justify-center cursor-pointer'>
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


