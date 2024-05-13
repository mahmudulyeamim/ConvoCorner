import React, { useState } from 'react'
import Avatar from './Avatar'

export default function FileInput() {
    const [file, setFile] = useState("")
    console.log(file)
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <input type="file" className="file-input file-input-bordered w-full max-w-xs bg-white my-4" onChange={e => setFile(e.target.files[0])} />
      {
          file && <Avatar src={URL.createObjectURL(file)} />
      }
    </div>
  )
}
