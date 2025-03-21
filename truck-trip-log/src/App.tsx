import { Outlet } from "react-router-dom"
import logo from "./assets/favicon.jpg"
import { useEffect, useState } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md";
function App() {
  const [mode, setMode] = useState<boolean>(false);  // Toggle light/dark mode state
  const [year, setYear] = useState<number | null>(null); // Setting current year

  useEffect(() => {
    const date = new Date();
    const yr = date.getFullYear();
    setYear(yr);
  });

  return (
    <div className={`flex flex-col bg-violet-200 min-h-screen ${mode && "dark"}`}>
      <header className="bg-linear-to-r from-sky-800 to-sky-900  dark:bg-linear-to-r dark:from-slate-700 dark:to-slate-800  shadow-md">
        <nav className="flex flex-row items-center justify-between py-2 max-sm:p-1 max-xl:px-3 w-full max-w-7xl mx-auto">
          <div className="flex flex-row items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9 max-sm:h-7 max-sm:w-7 rounded-full" />
            <h1 className="text-3xl max-sm:text-[20px] max-md:text-2xl font-bold">Truck Trip App</h1>
          </div>
          <button
            title='Toggle dark/light mode'
            onClick={() => setMode(prev => !prev)}
            className="flex items-center justify-center rounded-full hover:bg-blue-600 
              w-6 h-6 sm:w-8 sm:h-8 cursor-pointer transition-colors duration-300 mx-auto"
          >{mode ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
          </button>
        </nav>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-linear-to-br from-violet-600 via-violet-800 to-violet-600">
        <p className="text-center p-2 text-[15px]">&copy; {year && year}&nbsp;
          <a href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215" target='_blank' className='text-blue-700 hover:text-violet-600' title='Visit kgn linkedin'>KGN</a>
          . All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
