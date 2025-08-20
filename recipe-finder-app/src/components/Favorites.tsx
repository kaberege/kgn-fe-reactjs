import { useState } from 'react'

function Favorites() {
  const [count, setCount] = useState<number>(0)
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div data-testid="counter-value">{count}</div>
      <button 
      onClick={() => setCount(prev => prev + 1)}
      className='border border-amber-400 bg-amber-50 cursor-pointer rounded-2xl p-2'
      >Increment count</button>
    </div>
  )
}

export default Favorites 