"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { HiSquares2X2 } from "react-icons/hi2";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BiSolidMessageAltEdit } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import SideBarRoomTitle from './SideBarRoomTitle';
import { chatRooms } from '@/data';


export default function Sidebar() {
  const [active, setActive] = useState(null)
  return (
    <div className='min-w-[20%] overflow-scroll min-h-screen sidebar border-r border-gray-200'>
      <h1 className='text-2xl font-bold text-center py-4 text-white'>Your Chat Rooms</h1>
      { chatRooms.map((room, index) => (
        <SideBarRoomTitle key={index} room={room} active={active} setActive={setActive} />
      )) }
    </div>
  )
}
