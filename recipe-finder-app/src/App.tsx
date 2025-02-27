import { NavLink, Outlet } from "react-router-dom"
import logo from "./assets/favicon.jpg"
import { useState } from "react"

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
            <ul className={`flex flex-row gap-3 items-center ${navBar && "max-sm:hidden max-sm:relative"} max-sm:fixed max-sm:top-0 max-sm:right-0 max-sm:flex-col`}>
              <button onClick={() => setNavBar(prev => !prev)}
                className="sm:hidden absolute top-1 right-4 h-7 w-7 rounded-full text-gray-100 bg-blue-700"
              > X</button>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="">Favorites</NavLink></li>
              <li><NavLink to="">Recommendations</NavLink></li>
            </ul>
            <button
              onClick={() => setNavBar(prev => !prev)}
              className={`${!navBar && "max-sm:hidden"} sm:hidden h-7 w-7 rounded-full text-gray-100 bg-blue-700`}
            >=</button>
          </nav>
        </header>
        <main className="grow">
          <Outlet />
        </main>
        <footer className="bg-violet-800"><p className="text-center p-2">&copy;2025 Allrights reserved.</p></footer>
      </div>
    </>
  )
}

export default App
