import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog' 
import { toast } from './ui/use-toast'
import { Button } from './ui/button'

export default function NewChatRoomCreate() {
    const [roomName, setRoomName] = useState('')
    const [topicName, setTopicName] = useState('')

    async function handleChatRoomCreation() {
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/chatrooms`
        let token = localStorage.getItem("token")
        if (!token) {
            toast({
                title: "You are unauthorized",
                variant: "error"
              })
            return
        }
        token = JSON.parse(token)
        const data = {
            name : roomName,
            topic : topicName
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken,
                "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(data)
        })
        const ans = await response.json()
        if(ans.id != null) {
            toast({
                title: "Chat Room Created Successfully",
                variant: "success"
              })
        }
    }

    
  return (
    <div>
      <Dialog className="bg-white rounded-2xl">
            <DialogTrigger className='w-full'>  
                <Button className="bg-[#4ec215]">Create New Chat Room</Button>
            </DialogTrigger>
            <DialogContent className="p-12 max-w-2xl bg-white rounded-2xl">
                <DialogHeader className={`flex items-center w-full mx-auto font-bold text-xl text-center`}>Create New Chat Room</DialogHeader>

                <div className="space-x-4">
                    <label className='my-1 font-semibold'>Room Name</label>
                    <input type="text" className="input w-full focus:outline-none bg-white whitespace-wrap break-words mt-2 px-4 py-1 border border-gray-200 focus:border-[var(--d-g)] rounded-md" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                </div>
                <div className="space-x-4">
                    <label className='my-1 font-semibold'>Topic Name :</label>
                    <input type="text" className="input w-full focus:outline-none bg-white whitespace-wrap break-words mt-2 px-4 py-1 border border-gray-200 focus:border-[var(--d-g)] rounded-md" value={topicName} onChange={(e) => setTopicName(e.target.value)} />
                </div>
                
                
                <Button onClick={handleChatRoomCreation} className="bg-[var(--l-g)] mt-4 py-2 w-48 px-4 mx-auto">Done</Button>
            </DialogContent>
        </Dialog>
    </div>
  )
}
