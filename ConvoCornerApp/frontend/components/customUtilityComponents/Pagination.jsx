import { set } from 'date-fns'
import React, { useState } from 'react'
import JobPostCard from '../jobs/JobPostCard';

export default function Pagination({ jobs }) {
  console.log(jobs.length)
  const [dataRange, setDataRange] = useState([0, 6])
  function handleCarousel(type) {
    if (type === 'next') {
      setDataRange((prev) => {
        if (prev[1] < jobs.length) {
          return [prev[0] + 6, prev[1] + 6]
        }
        return prev
      })
    } else {
      setDataRange((prev) => {
        if (prev[0] > 0) {
          return [prev[0] - 6, prev[1] - 6]
        }
        return prev
      })
    }
  }
  const  data = jobs
  const filteredData = jobs.slice(dataRange[0], dataRange[1]);
  return (
    <div>
      <div className='p-8 grid grid-cols-3 gap-4 mx-auto'>
          {filteredData.map(job => (
            <JobPostCard job={job} key={job.id} />
          ))}
        </div>
      <div className="join space-x-2 flex items-center justify-center absolute bottom-8 left-0 right-0">
        <button onClick={() => handleCarousel('prev')} className="border w-48 border-gray-200 rounded-lg bg-[#DDE6E5] px-4 py-2 text-lg">Previous Jobs</button>
        <button onClick={() => handleCarousel('next')} className="border w-48 text-white border-gray-200 rounded-lg bg-[#216A70] px-4 py-2 text-lg">Next Jobs</button>
      </div>
    </div>
  )
}
