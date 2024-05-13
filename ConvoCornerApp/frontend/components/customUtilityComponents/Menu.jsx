import React from 'react'

export default function Menu() {
  return (
    <div>
      <ul className="menu menu-vertical lg:menu-horizontal bg-gray-100 rounded-box">
        <li><a className='hover:bg-white'>Item 1</a></li>
        <li><a className='hover:bg-white'>Item 2</a></li>
        <li><a className='hover:bg-white'>Item 3</a></li>
      </ul>
    </div>
  )
}
