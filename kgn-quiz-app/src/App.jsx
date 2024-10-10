import React, { useState, useEffect } from 'react';
import "./index.css"
import { Outlet, NavLink } from 'react-router-dom';
import logo from "./assets/main-logo-white.jpeg";
import { FaBars, FaWindowClose } from "react-icons/fa";

export default function App() {
  const [year, setYear] = useState(0);  // Set current year
  const [mode, setMode] = useState(false); // handle dark and light modes
  const [hideNav, setHideNav] = useState(true);
  //setting current year in the footer
  useEffect(() => {
    const date = new Date();
    const y = date.getFullYear();
    setYear(y);
  }, [])

  return (

    <div className={`${mode && "dark"}`}>
      <div className="min-h-screen bg-gray-100 flex dark:bg-slate-900 flex-col transition duration-300">
        <header className="bg-blue-600 dark:bg-slate-600 shadow-md transition duration-300">
          <div className='max-w-7xl mx-auto flex flex-row items-center text-white p-1 text-center'>
            <div className='flex flex-row flex-grow items-center gap-2'>
              <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full animate-image cursor-pointer" title='kgn logo' />
              <h1 className="max-md:text-2xl text-3xl font-bold">Quiz App</h1>
            </div>
            <div
              onClick={() => setHideNav(false)}
              className=' flex text-2xl items-center justify-center sm:hidden font-bold flex-row w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
              <FaBars />
            </div>
            <nav
              className={`shadow-lg ${hideNav && "max-sm:hidden"} max-sm:h-full max-sm:w-1/3 max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:p-2 max-sm:bg-blue-400 max-sm:dark:bg-slate-600 transition-transform duration-1000`}>
              <div
                onClick={() => setHideNav(true)}
                className=' flex text-2xl items-center justify-center float-end sm:hidden font-bold flex-row w-9 h-9 hover:bg-slate-400 rounded-full cursor-pointer' >
                <FaWindowClose />
              </div>
              <ul className="flex flex-row max-sm:flex-col items-center gap-3 max-sm:gap-5 max-sm:mt-14">
                <li className='hover:text-cyan-300 transition font-bold'><NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-300" : ""}>Home</NavLink></li>
                <li className='hover:text-cyan-300 transition font-bold'><NavLink to="/history" className={({ isActive }) => isActive ? "text-cyan-300" : ""}>History</NavLink></li>
                <li>
                  <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' className='hover:text-cyan-300 transition font-bold' title='Visit kgn website'>
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
                    onChange={() => setMode(!mode)}
                    className='hidden'
                  />
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow p-5">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center dark:text-slate-300 transition duration-300">
          <p className='text-sm'>Copyright &copy; {year} <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' className='text-blue-500 transition hover:text-blue-700' title='Visit kgn website'>KGN</a>. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}


