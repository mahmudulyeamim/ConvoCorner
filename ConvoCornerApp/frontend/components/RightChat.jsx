import React from 'react'

export default function RightChat({ message }) {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        { 
        !message.image_data?.startsWith('data:text/plain;base64,') &&
        <div className="flex items-end justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                {message.username[0]}
            </div>
            
            <div>
                <h1 className='text-xs text-gray-100 font-semibold mb-2 text-end mr-4'>{message.username}</h1>
                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    {message.text != null && <h1>{message.text}</h1>}
                    {message.image_data != null &&  <img src={message.image_data} width={200} />}
                </div>
            </div>
        </div>
        }
    </div>
  )
}
