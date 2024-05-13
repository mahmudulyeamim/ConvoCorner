import React, { useState } from 'react'

export default function Range() {
    const [price, setPrice] = useState(0)
    console.log(price)
  return (
    <div>
      <div className='text-2xl p-4 flex items-center justify-center'>
        {price}
      </div>
      <input onChange={e => setPrice(e.target.value)}  type="range" min={0} max="100" defaultValue={price} className="range w-96 range-info" />
    </div>
  )
}
