import React from 'react'
import "./index.css"
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <div className='text-blue-800'>
        Hello world
      </div>

      <Outlet />
    </div>
  )
}

export default App
