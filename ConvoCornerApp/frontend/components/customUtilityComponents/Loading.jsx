import React from 'react'

export default function Loading() {
  return (
    <div>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>


        <div>
            
            <span className="loading loading-dots text-green-600 w-16"></span>
        </div>
        <div>
            <span className="loading loading-ring w-32 text-green-700"></span>
        </div>
        
    </div>
  )
}
