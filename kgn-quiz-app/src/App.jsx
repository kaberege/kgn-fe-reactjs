import React, { useState, useEffect } from 'react';
import "./index.css"
import { Outlet, NavLink } from 'react-router-dom';
import logo from "./assets/main-logo-white.jpeg";

export default function App() {
  const [year, setYear] = useState(0);

  //setting current year in the footer
  useEffect(() => {
    const date = new Date();
    const y = date.getFullYear();
    setYear(y);
  }, [])

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 flex flex-row text-white p-1 text-center">
        <div className='flex flex-row flex-grow items-center gap-2'>
          <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full animate-image cursor-pointer" title='kgn logo' />
          <h1 className="max-md:text-2xl text-3xl flex-grow text-center font-bold">Quiz App</h1>
        </div>
        <nav className='flex flex-row bg-red-400 items-center gap-3'>
          <ul className='flex flex-row items-center gap-3'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
            <li>
              <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' className='' title='Visit kgn website'>
                About</a>
            </li>
          </ul>
          <p>Dark mode</p>
        </nav>
      </header>
      <main className="flex-grow p-5">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className='text-sm'>Copyright &copy; {year} <a href='https://kaberege.github.io/kgn.github.io/' target='_blank' className='text-blue-500 transition hover:text-blue-700' title='Visit kgn website'>KGN</a>. All rights reserved.</p>
      </footer>
    </div>
  )
}


