import React from 'react'
import { FaRegHeart } from "react-icons/fa6";

export default function Stat() {
  return (
    <div>
      <div className="stats shadow">
  
        <div className="stat">
            <div className="stat-figure text-white">
                <FaRegHeart className='text-2xl'/>
            </div>
            <div className="stat-title text-white">Total Likes</div>
            <div className="stat-value text-white">25.6K</div>
            <div className="stat-desc text-white">21% more than last month</div>
        </div>
  
        <div className="stat">
            <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title text-white">Page Views</div>
            <div className="stat-value text-white">2.6M</div>
            <div className="stat-desc text-white">21% more than last month</div>
        </div>
  
        <div className="stat">
            <div className="stat-figure text-secondary">
            <div className="avatar online">
                <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            </div>
            <div className="stat-value text-white">86%</div>
            <div className="stat-title text-white">Tasks done</div>
            <div className="stat-desc text-secondary text-white">31 tasks remaining</div>
        </div>
        
      </div>  
    </div>
  )
}
