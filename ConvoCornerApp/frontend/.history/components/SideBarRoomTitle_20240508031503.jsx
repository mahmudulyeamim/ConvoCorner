import React from 'react'

export default function SideBarRoomTitle({ room, active, setActive }) {
    console.log(active)
  return (
    <div onClick={() => setActive(room?.id)} className={`p-3 rounded-lg border border-gray-300 m-3 w-[90%] cursor-pointer ${active == room?.id && "bg-white"}`}>
        <div className="w-full items-center flex">
            <div className="w-full justify-between items-center inline-flex">
                <div className="items-center flex">
                    <img className="rounded-lg" alt="Ronald image" src="https://pagedone.io/asset/uploads/1701235464.png" />
                    <div className="flex-col inline-flex ml-2.5">
                        <h2 className={`text-sm font-semibold leading-snug ${active == room?.id ? "text-black" : "text-white"}`}>{room?.description}</h2>
                        <h6 className={`text-xs font-normal leading-4 ${active == room?.id ? "text-black" : "text-gray-100"}`}>{room?.messages[0].user.name} : {room?.messages[0].message}</h6>
                    </div>
                </div>
                <div className="flex items-center">
                    <a href="javascript:;" className="w-5 h-5 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g id="More Vertical">
                                <path id="icon" d="M10.0156 14.9896V15.0396M10.0156 9.97595V10.026M10.0156 4.96228V5.01228" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
