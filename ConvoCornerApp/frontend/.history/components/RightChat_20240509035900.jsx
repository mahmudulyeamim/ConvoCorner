import React from 'react'

export default function RightChat({ message }) {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-end justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                {message.user.name[0]}
            </div>
            
            <div>
                <h1 className='text-xs text-gray-100 font-semibold mb-2 text-end mr-4'>{message.user.name}</h1>
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <h1>{message.text}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
