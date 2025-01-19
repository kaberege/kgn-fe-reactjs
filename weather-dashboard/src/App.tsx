import { useEffect, useState } from 'react';
import "./index.css";
import { Outlet } from 'react-router-dom';
import favicon from "./assets/favicon.jpg"
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function App() {
  const [mode, setMode] = useState<boolean>(false); // Toggle dark/light mode
  const [date, setDate] = useState<number>(); // Current year

  useEffect(() => {
    const yr: Date = new Date();
    const year: number = yr.getFullYear();
    setDate(year);
  }, []);

  return (
    <div className={`${mode && "dark"} flex flex-col bg-gray-100 min-h-screen transition-colors duration-300`}>
      <header className="p-1 bg-gray-800 dark:bg-gray-900 text-white">
        <nav className='flex gap-3 justify-between items-center w-full max-w-7xl mx-auto max-sm:px-1 max-xl:px-3 '>
          <div className='flex gap-3 items-center'>
            <img
              src={favicon}
              alt="kgn logo"
              title='kgn logo'
              className='w-7 h-7 sm:w-10 sm:h-10 cursor-pointer rounded-full' />
            <h1 className="text-xl font-bold max-sm:hidden">Weather Dashboard</h1>
          </div>
          <button
            title='Toggle dark/light mode'
            onClick={() => setMode(!mode)}
            className="flex items-center justify-center p rounded-full bg-blue-600 w-6 h-6 sm:w-8 sm:h-8"
          >
            {mode ? (
              <MdDarkMode className="text-white max-sm:text-xl text-2xl" />
            ) : (
              <MdLightMode className="text-yellow-500 max-sm:text-xl text-2xl" />
            )}
          </button>
        </nav>
      </header>
      <main className="p-4 flex flex-col justify-center items-center flex-grow relative">
        <h1 className="text-xl font-bold sm:hidden absolute top-2">Weather Dashboard</h1>
        <Outlet />
      </main>
      <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center p-2">
        <p className='text-sm font-semibold max-w-[95%] mx-auto'>Copyright &copy; {date} <a href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215" target='_blank' className='text-blue-500 transition hover:text-blue-700' title='Visit kgn linkedin'>KGN</a>. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
