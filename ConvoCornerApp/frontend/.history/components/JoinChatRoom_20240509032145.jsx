import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog' 
import { toast } from './ui/use-toast'
import { Button } from './ui/button'

export default function JoinChatRoom() {
    const [roomId, setRoomId] = useState('')
    const [rooms, setRooms] = useState([])

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
        fetch(`${endpoint}/chatrooms/0`, {
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
                setRooms(data)
            })
      }, [])
    
    async function handleChatRoomJoin() {
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/participants/${roomId}`
        let token = localStorage.getItem("token")
        if (!token) {
            toast({
                title: "You are unauthorized",
                variant: "error"
              })
            return
        }
        token = JSON.parse(token)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken,
                "ngrok-skip-browser-warning": "69420"
            },
        })
        const ans = await response.json()
        if(ans.id != null) {
            toast({
                title: "Chat Room Joining Done Successfully",
                variant: "success"
              })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }
  return (
    <div>
      <Dialog className="bg-white rounded-2xl">
            <DialogTrigger className='w-full'>  
                <Button className="bg-[#4ec215]">Join A Chat Room</Button>
            </DialogTrigger>
            <DialogContent className="p-12 max-w-2xl bg-white rounded-2xl">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Create New Chat Room</DialogHeader>
                {rooms?.map((room, index) => (
                    <div key={index} className="space-x-4">
                        <h1>Room Name : {room.name}</h1>
                        <h1>Topic Name : {room.topic}</h1>
                    </div>
                ))}
                <Button onClick={handleChatRoomJoin} className="bg-[var(--l-g)] mt-4 py-2 w-48 px-4 mx-auto">Done</Button>
            </DialogContent>
        </Dialog>
    </div>
  )
}
