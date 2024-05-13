import React from 'react'

export default function DropdownMenu() {
  return (
    <div className="dropdown dropdown-end bg-white text-black">
        <div tabIndex={0} role="button" className="btn m-1 bg-white text-black hover:bg-white hover:text-black">Click</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-52">
                <li><a href='https://google.com'>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
    </div>
  )
}
