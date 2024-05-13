import React from 'react'

export default function LeftChat() {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-end">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">{message.user.name[0]}</div>
            
            <div>
                <h1 className='text-xs text-gray-100 font-semibold ml-4 mb-2'>{message.user.name}</h1>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <h1>{message.text}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
