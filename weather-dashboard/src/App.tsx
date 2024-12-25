//import react from 'react'
import "./index.css"
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>
        Weather Dashboard
      </h1>
      <Outlet />
    </>
  )
}

export default App
