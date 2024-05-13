import React from 'react'

export default function Skeleton() {
  return (
    <div>
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton2 h-32 w-full"></div>
        <div className="skeleton2 h-4 w-28"></div>
        <div className="skeleton2 h-4 w-full"></div>
        <div className="skeleton2 h-4 w-full"></div>
      </div>
    </div>
  )
}



