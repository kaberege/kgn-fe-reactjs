import React, { useState, useEffect } from 'react';
import "./index.css"
import { Outlet } from 'react-router-dom';

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
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Quiz App</h1>
      </header>
      <main className="flex-grow p-5">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {year} Quiz App. All rights reserved.</p>
      </footer>
    </div>
  )
}


