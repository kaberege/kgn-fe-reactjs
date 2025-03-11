import { NavLink, Outlet } from "react-router-dom"
import logo from "./assets/favicon.jpg"
import { useState } from "react"
import { FaBars, FaWindowClose } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
function App() {
  const [navBar, setNavBar] = useState<boolean>(true);  // Toggle navigtion bar on small devices
  const [mode, setMode] = useState<boolean>(false);  // Toggle light/dark mode state

  return (
    <div className={`flex flex-col bg-violet-200 min-h-screen ${mode && "dark"}`}>
      <header className="bg-linear-to-r from-sky-800 to-sky-900  dark:bg-linear-to-r dark:from-slate-700 dark:to-slate-800  shadow-md">
        <nav className="flex flex-row items-center justify-between py-2 max-sm:p-1 max-xl:px-3 w-full max-w-7xl mx-auto">
          <div className="flex flex-row items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9 max-sm:h-7 max-sm:w-7 rounded-full" />
            <h1 className="text-3xl max-sm:text-[20px] max-md:text-2xl font-bold">Recipe Finder</h1>
          </div>
          <div className={`${navBar ? "max-md:-right-full" : "max-md:right-0 z-20"} max-md:w-1/2 max-md:top-0 
                flex flex-row gap-4 max-md:bg-linear-to-br from-violet-500 to-fuchsia-500 dark:max-md:bg-linear-to-br dark:from-violet-800 dark:to-fuchsia-900
                max-md:shadow-lg max-md:h-screen max-md:transition-[right] max-md:duration-500 max-md:fixed max-md:flex-col`}>
            <button
              onClick={() => setNavBar(prev => !prev)}
              className="md:hidden h-7 w-7 rounded-full text-gray-100 hover:bg-blue-700 transition-colors duration-300
              flex items-center justify-center cursor-pointer mt-1 ml-1"
            ><FaWindowClose size={19} /></button>
            <ul
              className="flex flex-row gap-9 max-md:gap-4 items-center justify-center max-md:flex-col 
                max-md:text-[18px] text-[20px]">
              <li><NavLink to="/" className={({ isActive }) => isActive ? "text-stone-600 hover:text-stone-800  dark:text-stone-300 dark:hover:text-stone-400" :
                "text-yellow-50 hover:text-yellow-200 dark:text-amber-200 dark:hover:text-amber-400"}
              >Home</NavLink></li>
              <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "text-stone-600 hover:text-stone-800  dark:text-stone-300 dark:hover:text-stone-400" :
                "text-yellow-50 hover:text-yellow-200 dark:text-amber-200 dark:hover:text-amber-400"}>Favorites</NavLink></li>
              <li><NavLink to="/recommendations" className={({ isActive }) => isActive ? "text-stone-600 hover:text-stone-800  dark:text-stone-300 dark:hover:text-stone-400" :
                "text-yellow-50 hover:text-yellow-200 dark:text-amber-200 dark:hover:text-amber-400"}>Recommendations</NavLink></li>
            </ul>
            <button
              title='Toggle dark/light mode'
              onClick={() => setMode(prev => !prev)}
              className="flex items-center justify-center rounded-full hover:bg-blue-600 
              w-6 h-6 sm:w-8 sm:h-8 cursor-pointer transition-colors duration-300 mx-auto"
            >{mode ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
            </button>
          </div>
          <button
            onClick={() => setNavBar(prev => !prev)}
            className={`${!navBar && "max-md:hidden"} md:hidden h-7 w-7 rounded-full text-gray-100 hover:bg-blue-700 transition-colors duration-300
              flex items-center justify-center cursor-pointer`}
          ><FaBars size={19} /></button>
        </nav>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-linear-to-br from-violet-600 via-violet-800 to-violet-600">
        <p className="text-center p-2 text-[15px]">Copyright &copy;2025&nbsp;
          <a href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215" target='_blank' className='text-blue-700 hover:text-violet-600' title='Visit kgn linkedin'>KGN</a>
          . All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
