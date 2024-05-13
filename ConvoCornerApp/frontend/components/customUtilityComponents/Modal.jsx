import React from 'react'
import { Button } from '../ui/button'

export default function Modal() {
  return (
    <div>
      <button className="btn bg-white text-black hover:bg-white hover:text-black" onClick={() => document.getElementById('modal').showModal()}>Send</button>
       <dialog id="modal" className="modal modal-bottom sm:modal-middle bg-white">
        <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Warning!</h3>
            <p className="py-4">Are you sure you want to delete?</p>
            <div className="modal-action">
                <form method="dialog flex space-x-8">
                    <button className="btn bg-green-500 text-black hover:bg-base-200 mr-4 hover:text-white">Yes</button>
                    <button className="btn bg-white text-black hover:bg-base-200 hover:text-white">Cancel</button>
                </form>
            </div>
        </div>
       </dialog>
    </div>
  )
}
