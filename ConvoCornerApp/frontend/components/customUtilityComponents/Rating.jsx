import React, { useState } from 'react'

export default function Rating() {
    const [rating, setRating] = useState(1)
    console.log(rating)
  return (
    <div>
      <div className="rating">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(1)} />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(2)} />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(3)} />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(4)} />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" onChange={() => setRating(5)} />
      </div>
    </div>
  )
}
