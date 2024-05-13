"use client"
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatComponent from '@/components/ChatComponent'
import ChatRightSide from '@/components/ChatRightSide'

export default function page() {
  const [activeChatRoom, setActiveChatRoom] = useState(null)
  return (
    <div className='flex'>
      <Sidebar activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
      <ChatComponent activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
      <ChatRightSide activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
    </div>
  )
}
