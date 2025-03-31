import { Outlet } from "react-router-dom";
import logo from "./assets/favicon.jpg";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function App() {
  const [mode, setMode] = useState<boolean>(false);  // Toggle light/dark mode state
  const [year, setYear] = useState<number | null>(null); // Setting current year

  useEffect(() => {
    const date:Date = new Date();
    const yr:number = date.getFullYear();
    setYear(yr);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${mode && "dark"}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-800 to-sky-900 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800 shadow-md">
        <nav className="flex items-center justify-between py-1 sm:py-2 px-2 sm:px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              title="KGN Logo"
              className="h-7 w-7 sm:h-9 sm:w-9 rounded-full"
            />
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
            Trip Tracker App
            </h1>
          </div>
          <button
            title="Toggle Dark/Light Mode"
            onClick={() => setMode(prev => !prev)}
            className="flex items-center justify-center rounded-full bg-white text-black dark:bg-gray-950
             dark:text-white p-1 sm:p-2 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
          >
            {mode ? <MdDarkMode size={17} /> : <MdLightMode size={17} />}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="grow px-2 sm:px-6 bg-white dark:bg-gray-900 transition-all">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 dark:from-indigo-700 dark:via-blue-700 dark:to-purple-700 p-2 sm:p-3 text-white">
        <p className="text-center text-xs sm:text-sm">
          &copy; {year}{" "}
          <a
            href="https://www.linkedin.com/in/kaberege-godard-nestor-53a0b4215"
            target="_blank"
            className="text-blue-200 hover:text-blue-400 transition-colors"
            title="Visit KGN LinkedIn"
          >
            KGN
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
