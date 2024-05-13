import React from 'react'

export default function SwapEffect() {
  return (
    <div>
      <label className="swap">
        <input type="checkbox" />
        <div className="swap-on bg-green-500 rounded-lg px-4 py-2">
        {/* If on we will do something */}
            ON
        </div>
        <div className="swap-off bg-black text-white rounded-lg px-4 py-2">
        {/* If off we will do something */}
            OFF
        </div>
      </label>
    </div>
  )
}
