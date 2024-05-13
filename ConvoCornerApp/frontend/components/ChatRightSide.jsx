import React, { useEffect, useState } from 'react'
import FullImageComponent from './FullImageComponent'

export default function ChatRightSide({ activeChatRoom, setActiveChatRoom, flag }) {
  const [name, setName] = useState(null)
  const [images, setImages] = useState([])
  useEffect(() => {
    let token = null
    token = localStorage.getItem("token")
    token = JSON.parse(token)
    setName(token.name)
  }, [])
  useEffect(() => {
    if(activeChatRoom != null) {
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
      let token = localStorage.getItem("token")
      if (!token) {
          toast({
              title: "You are unauthorized",
              variant: "error"
            })
          return
      }
      token = JSON.parse(token)
      fetch(`${endpoint}/messages/images/${activeChatRoom}`, {
          method: 'GET',
          headers : {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.accessToken,
          "ngrok-skip-browser-warning": "69420"
          }
      })
      .then((res) => res.json())
      .then((data) => {
          if(data.detail === "Not authenticated") {
              toast({
                  title: "You are not authorized.",
                  variant: "error"
              })
          }
          setImages(data)
          console.log(data)
      })
    }
  } , [activeChatRoom, flag])

  console.log(images)

  return (
    <div class="flex h-screen antialiased text-gray-800 w-full bg-indigo-100">
        <div class="flex flex-row h-full w-full">
        <div class="flex flex-col py-8 bg-white flex-shrink-0 w-full">
            <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
                class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
            >
                <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
                </svg>
            </div>
            <div class="ml-2 font-bold text-2xl">ConvoCorner</div>
            </div>
            <div
            class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 mx-auto py-6 px-4 rounded-lg w-[90%]"
            >
            <div class="h-20 w-20 rounded-full border overflow-hidden">
                <img
                src="/5.jpg"
                alt="Avatar"
                class="h-full w-full"
                />
            </div>
            <div class="text-sm font-semibold mt-2">{name}</div>
            
            </div>

            <div className='grid grid-cols-2 example px-8 gap-1 h-96 overflow-scroll border-t border-gray-200 pt-4 mt-4'>
                
                {
                    images.map((image, index) => {
                        return (<FullImageComponent src={image.image_data} index={index} />)
                    })
                }
                
            </div>

        </div>
        </div>


  </div>

  )
}
