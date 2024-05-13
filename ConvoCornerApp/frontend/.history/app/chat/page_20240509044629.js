"use client"
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatComponent from '@/components/ChatComponent'
import ChatRightSide from '@/components/ChatRightSide'

export default function page() {
  const [activeChatRoom, setActiveChatRoom] = useState(null)

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("token");
    if(token == null) { 
      window.location.href = '/login';
    }
    token = JSON.parse(token);
  }
  return (
    <div className='flex'>
      <Sidebar activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
      {activeChatRoom != null ? <ChatComponent activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} userId={token.id} /> : null}
      <ChatRightSide activeChatRoom={activeChatRoom} setActiveChatRoom={setActiveChatRoom} />
    </div>
  )
}
