import { NavLink, Outlet } from "react-router-dom"
import logo from "./assets/favicon.jpg"
import { useState } from "react"
import { FaBeer } from "react-icons/fa";
function App() {
  const [navBar, setNavBar] = useState<boolean>(true);

  return (
    <>
      <div className="flex flex-col bg-sky-300 min-h-screen">
        <header className=" bg-violet-800 ">
          <nav className="flex flex-row items-center justify-between p-1 w-full max-w-7xl mx-auto">
            <div className="flex flex-row items-center gap-3">
              <img src={logo} alt="Logo" className="h-9 w-9 max-sm:h-7 max-sm:w-7 rounded-full" />
              <h1>Recipe Finder</h1>
            </div>
            <ul
              className={`${navBar ? "max-sm:-right-full" : "max-sm:right-0"} max-sm:w-1/2 max-sm:top-0 
                flex flex-row gap-3 items-center max-sm:bg-violet-950 max-sm:h-screen 
                max-sm:transition-[right] max-sm:duration-500 max-sm:fixed max-sm:flex-col`}>
              <button onClick={() => setNavBar(prev => !prev)}
                className="sm:hidden h-7 w-7 rounded-full text-gray-100 bg-blue-700 absolute left-2 top-2"
              >X</button>
              <li className="max-sm:mt-11"><NavLink to="/" className={({ isActive }) => isActive ? "text-stone-800" : "text-yellow-50"}>Home</NavLink></li>
              <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "text-stone-800" : "text-yellow-50"}>Favorites</NavLink></li>
              <li><NavLink to="/recommendations" className={({ isActive }) => isActive ? "text-stone-800" : "text-yellow-50"}>Recommendations</NavLink></li>
            </ul>
            <button
              onClick={() => setNavBar(prev => !prev)}
              className={`${!navBar && "max-sm:hidden"} sm:hidden h-7 w-7 rounded-full text-gray-100 bg-blue-700`}
            ><FaBeer/></button>
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
    </>
  )
}

export default App
