"use client"
import React, { useEffect, useState } from 'react'
import SideBarRoomTitle from './SideBarRoomTitle';
import { chatRooms } from '@/data';
import { toast } from './ui/use-toast';
import { set } from 'date-fns';


export default function Sidebar() {
  const [active, setActive] = useState(null)
  const [chatRooms, setChatRooms] = useState([])
  console.log(active)
  useEffect(() => {
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
    fetch(`${endpoint}/chatrooms/1`, {
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
            setChatRooms(data)
        })
  }, [])

  return (
    <div className='min-w-[20%] overflow-scroll min-h-screen sidebar border-r border-gray-200'>
      <h1 className='text-2xl font-bold text-center py-4 text-white'>Your Chat Rooms</h1>
      { chatRooms?.map((room, index) => (
        <SideBarRoomTitle key={index} room={room} active={active} setActive={setActive} />
      )) }
    </div>
  )
}
