import React from 'react';
import "./index.css"
import { Outlet } from 'react-router-dom';

 export default function App() {

  return (
    <div>
      <div className='text-blue-800'>
        Hello world
      </div>
      <Outlet/>
    </div>
  )
}


