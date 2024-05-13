import React from 'react'

export default function Drawer() {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                <ul className="menu p-4 w-80 min-h-full bg-white text-black">
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
        </div>
      </div>
    </div>
  )
}
