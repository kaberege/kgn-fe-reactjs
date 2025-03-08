import React, { useState, useEffect } from 'react';
import "./index.css"
import { Outlet, NavLink } from 'react-router-dom';
import logo from "./assets/main-logo-white.jpeg";
import kgnProfile from "./assets/green.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { FaBars, FaWindowClose, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";

export default function App() {
  const [year, setYear] = useState(0);  // Set current year
  const [mode, setMode] = useState(false); // handle dark and light modes
  const [hideNav, setHideNav] = useState(true); //handle navigation bar close and open

  //setting current year in the footer
  useEffect(() => {
    const date = new Date();
    const y = date.getFullYear();
    setYear(y);
  }, []);

  return (
    <div className={`${mode && "dark"}`}>
      <div className="min-h-screen bg-gray-100 flex dark:bg-slate-900 flex-col transition-colors duration-300">
        <header className="sticky top-0 z-10 bg-blue-600 dark:bg-slate-600 shadow-2xl transition-colors duration-300">
          <div className='max-w-7xl mx-auto flex flex-row items-center text-white py-1 px-2 xl:px-1 text-center'>
            <div className='flex flex-row flex-grow items-center gap-2'>
              <img src={logo} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full animate-image cursor-pointer" title='kgn logo' />
              <h1 className="max-md:text-2xl text-3xl font-bold">Quiz App</h1>
            </div>
            <div
              onClick={() => setHideNav(false)}
              className=' flex text-2xl items-center justify-center sm:hidden font-bold flex-row w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
              <FaBars />
            </div>
            <nav
              style={{ transition: "right 0.3s linear" }}
              className={`flex flex-row max-sm:flex-col ${hideNav ? "max-sm:-right-3/4 max-sm:overflow-hidden" : "max-sm:right-0 max-sm:w-1/2"} max-sm:h-full max-sm:fixed max-sm:top-0  max-sm:p-2 max-sm:bg-blue-600 max-sm:dark:bg-slate-600 transition-colors duration-300`}
            >
              <div
                onClick={() => setHideNav(true)}
                className=' flex text-2xl items-center justify-center ml-auto sm:hidden font-bold w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
                <FaWindowClose />
              </div>
              <ul className="flex flex-row max-sm:flex-col items-center gap-3 max-sm:gap-5 max-sm:mt-8">
                <li className='hover:text-cyan-300 transition font-bold'><NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-300" : ""}>Home</NavLink></li>
                <li className='hover:text-cyan-300 transition font-bold'><NavLink to="/history" className={({ isActive }) => isActive ? "text-cyan-300" : ""}>History</NavLink></li>
                <li>
                  <a href='https://kaberege-portfolio.vercel.app/' target='_blank' className='hover:text-cyan-300 transition font-bold' title='Visit kgn portfolio'>
                    About</a>
                </li>
                <li>
                  <label htmlFor='toggleBox' className='' title='Toggle light/dark mode'>
                    <div className='relative bg-slate-800 dark:bg-white w-7 h-4 rounded-lg flex items-center cursor-pointer'>
                      <div className='absolute w-3 h-3 bg-white rounded-full dark:bg-black dark:right-0 transition duration-300'></div>
                    </div>
                  </label>
                  <input
                    id="toggleBox"
                    type='checkbox'
                    checked={mode}
                    onChange={() => setMode(prev => !prev)}
                    className='hidden'
                  />
                </li>
              </ul>
              <ul className="flex items-center justify-center flex-row gap-2 sm:mx-8 max-sm:mt-8 max-sm:mb-5">
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
              <img
                src={kgnProfile}
                alt="kgn profile"
                title="Kgn profile"
                className="w-11 h-11 rounded-full cursor-pointer max-sm:mx-auto hover:scale-110 transition-transform duration-300"
              />
            </nav>
          </div>
        </header>
        <main className="flex-grow max-sm:p-3 p-5">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center dark:text-slate-300 transition-colors duration-300">
          <p className='text-sm'>Copyright &copy;{year} <a  href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215" target='_blank' className='text-blue-500 transition hover:text-blue-700' title='Visit kgn linkedin'>KGN</a>. All rights reserved.</p>
        </footer>
      </div >
    </div >
  )
}


