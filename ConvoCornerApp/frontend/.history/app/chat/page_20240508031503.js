import React from 'react'
import Sidebar from '@/components/Sidebar'
import ChatComponent from '@/components/ChatComponent'
import ChatRightSide from '@/components/ChatRightSide'

export default function page() {
  return (
    <div className='flex'>
      <Sidebar />
      <ChatComponent/>
      <ChatRightSide />
    </div>
  )
}
