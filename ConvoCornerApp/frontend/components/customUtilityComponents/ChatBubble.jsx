import React from 'react'

export default function ChatBubble() {
  return (
    <div className='w-[50%]'>
      {/*  Without Image */}
      <div className="chat chat-start">
        <div className="chat-bubble text-gray-100">It's over Anakin, <br/>I have the high ground.</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble text-white bg-blue-600">You underestimate my power!</div>
      </div>



      {/* With Image */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <div className="chat-bubble text-white">It was said that you would, destroy the Sith, not join them.</div>
      </div>
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="chat-bubble text-white">It was you who would bring balance to the Force</div>
        </div>
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="chat-bubble text-white">Not leave it in Darkness</div>
        </div>
        
    </div>
  )
}
