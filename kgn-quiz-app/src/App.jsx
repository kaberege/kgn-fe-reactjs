import React, { useState, useEffect } from 'react';
import "./index.css"
import { Outlet } from 'react-router-dom';
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
      <header className="bg-blue-600 flex text-white p-1 text-center">
        <img src={logo} alt="logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full animate-image cursor-pointer" title='kgn logo' />
        <h1 className="max-md:text-2xl text-3xl flex-grow text-center font-bold">Quiz App</h1>
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


