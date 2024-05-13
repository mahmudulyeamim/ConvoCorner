import React from 'react'

export default function Avatar({ src }) {
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-xl">
            <img src={src} />
        </div>
      </div>
      {/* <div className="avatar">
        <div className="w-24 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div> */}
    </div>
  )
}
