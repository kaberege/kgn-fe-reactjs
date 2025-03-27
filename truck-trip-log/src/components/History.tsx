import React from 'react'
import { Link } from 'react-router-dom'

const History = () => {
  return (
    <div>
        <div className='flex gap-2'>
          
                {/* Back to Home Link */}
                <Link to="/truck" >
                    <button className=" bg-blue-500 text-xs text-amber-300 hover:bg-blue-600 
                     p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
                  focus:ring-opacity-75 transition-all cursor-pointer
                  ">Back to Home</button>
                </Link>

                {/* Back to Form Link */}
                <Link to="/truck/map" >
                <button
                    className="p-1 bg-blue-500  text-amber-300 rounded-lg shadow-md
                 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
                  focus:ring-opacity-75 transition-all text-xs cursor-pointer"
                >
                    Back to map
                </button>
                </Link>
            </div>
            <div>History</div>
    </div>
  )
}

export default History