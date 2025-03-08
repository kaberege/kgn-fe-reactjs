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
      <header className="bg-lime-600 dark:bg-sky-950 z-10">
        <nav className="flex flex-row items-center justify-between p-1 w-full max-w-7xl mx-auto">
          <div className="flex flex-row items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9 max-sm:h-7 max-sm:w-7 rounded-full" />
            <h1>Recipe Finder</h1>
          </div>
          <div className={`${navBar ? "max-sm:-right-full" : "max-sm:right-0 z-20"} max-sm:w-1/2 max-sm:top-0 
                flex flex-row gap-4 max-sm:bg-violet-700 max-sm:h-screen 
                max-sm:transition-[right] max-sm:duration-500 max-sm:fixed max-sm:flex-col`}>
            <button
              onClick={() => setNavBar(prev => !prev)}
              className="sm:hidden h-7 w-7 rounded-full text-gray-100 hover:bg-blue-700 transition-colors duration-300
              flex items-center justify-center cursor-pointer mt-1 ml-1"
            ><FaWindowClose size={19} /></button>
            <ul
              className="flex flex-row gap-9 max-sm:gap-4 items-center justify-center max-sm:flex-col">
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
            className={`${!navBar && "max-sm:hidden"} sm:hidden h-7 w-7 rounded-full text-gray-100 hover:bg-blue-700 transition-colors duration-300
              flex items-center justify-center cursor-pointer`}
          ><FaBars size={19} /></button>
        </nav>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-violet-800">
        <p className="text-center p-2">Copyright &copy;2025&nbsp;
          <a href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215" target='_blank' className='' title='Visit kgn linkedin'>KGN</a>
          . All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
