"use client"
import React, { useEffect, useState } from 'react'
import LeftChat from './LeftChat'
import RightChat from './RightChat'
import { Button } from './ui/button'
import NewChatRoomCreate from './NewChatRoomCreate'
import JoinChatRoom from './JoinChatRoom'

export default function ChatComponent({ activeChatRoom, setActiveChatRoom, userId }) {

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [ws, setWs] = useState(null);

  function isOpen(ws) { return ws.readyState === ws.OPEN }



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
      fetch(`${endpoint}/messages/${activeChatRoom}`, {
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
          setMessages(data)
      })
    }
  } , [activeChatRoom])

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token");
    token = JSON.parse(token);
  }

  useEffect(() => {
      const websocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS}/messages/ws/${activeChatRoom}?user_id=1`);
      setWs(websocket);

      websocket.onmessage = (event) => {
        console.log(event.data);
      };

      return () => {
        websocket.close();
      };
    }, []);

    const sendMessage = () => {
      if (ws && message.trim() !== '') {
        ws.send(message);
        setMessage('');
      }
    };


  return (
    <div className='flex flex-col min-w-[55%] px-12 border-r border-gray-200'>    
    <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className='flex justify-center space-x-2 p-4  sticky top-0 right-0 left-0'>
          <NewChatRoomCreate />
          <JoinChatRoom />
        </div>
        <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {messages.map((message, index) => (
                  message.user_id == userId ? (
                    <RightChat key={index} message={message} />
                  ) : (
                    <LeftChat key={index} message={message} />
                  )
                ))
                  }
                
                
              </div>
            </div>
          </div>
          
          <div className="flex flex-row items-center h-16 rounded-xl border border-gray-200 w-full px-4">
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-white"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span onClick={sendMessage}>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
    </div>
  )
}
