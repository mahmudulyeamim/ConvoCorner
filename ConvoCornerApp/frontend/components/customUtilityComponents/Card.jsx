import React from 'react'

export default function Card() {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body bg-white">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary bg-black text-white">Buy Now</button>
            </div>
        </div>
       </div>
    </div>
  )
}
