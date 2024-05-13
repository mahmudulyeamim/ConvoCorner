"use client"
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatComponent from '@/components/ChatComponent'
import ChatRightSide from '@/components/ChatRightSide'

export default function page() {
  const [activeChatRoom, setActiveChatRoom] = useState(null)
  let token = localStorage?.getItem("token")
  if (token == null) {
    window.location.href = "/login"
  }
  const userId = JSON.parse(token).id
  return (
    <div className='flex'>
      <Sidebar activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
      <ChatComponent activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} userId = {userId} />
      <ChatRightSide activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
    </div>
  )
}
