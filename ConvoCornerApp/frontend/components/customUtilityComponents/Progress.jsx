import React, { useState } from 'react'

export default function Progress() {
  const [value, setValue] = useState(50)
  return (
    <div className='flex flex-col my-4'>
      <div>
        <progress className="progress progress-accent w-56" value="30" max="100"></progress>
      </div>
      <div>
        <progress className="progress progress-accent w-56" value="70" max="100"></progress>
      </div>
      <div>
        <progress className="progress progress-accent w-56" value="100" max="100"></progress>
      </div>


      {/* Circular Progress */}
      <div className='my-12 space-x-6'>
        
        <div className="radial-progress" style={{"--value": value}} role="progressbar">{value}%</div>

        <div className="radial-progress" style={{"--value":20}} role="progressbar">20%</div>
        <div className="radial-progress" style={{"--value":60}} role="progressbar">60%</div>
        <div className="radial-progress" style={{"--value":80}} role="progressbar">80%</div>
        <div className="radial-progress" style={{"--value":100}} role="progressbar">100%</div>
      </div>
    </div>
  )
}
