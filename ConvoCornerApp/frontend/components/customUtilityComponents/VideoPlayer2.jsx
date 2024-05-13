"use client"
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'




export default function VideoPlayer2({ src, poster }) {
  const [clientSide, setClientSide] = useState(false)
  useEffect(() => {
    setClientSide(true)
  }, [])
  return (
    <div className="rounded-[3rem] w-full h-full flex items-center justify-center">
        { clientSide && 
        <ReactPlayer url={src} controls={true} light={poster}
          playIcon={<img src='play_icon.png' className='h-24 w-24'/>}
          width={"100%"} 
          height={600} 
          playing={true} 
        />}
    </div>
  )
}
