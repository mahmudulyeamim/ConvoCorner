import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { MdArrowOutward } from "react-icons/md";


export default function VideoPlayer({ src, poster, width, height }) {
  return (
       <Dialog className="w-full h-screen">
            <DialogTrigger>
                <section className='px-32 my-4 '>
                    <div className='flex w-full justify-between px-8 py-8 items-center border border-gray-50 rounded-lg hover:bg-gradient-to-r from-[black] to-[var(--color-two)] bg-[var(--dark-cyan)]'>
                      <div className='flex flex-col justify-start'>
                          <h1 className='text-white text-4xl font-semibold text-start'>Schedule A Demo</h1>
                          <p className='text-white my-4 w-[70%] text-start'>JobsNavi wants to make your job search as easy as possible. We will ask you questions about your skills, 
                            experience and talents and match the right jobs with the help of algorithms and filter functions. 
                            No application or CV required. Create your profile in just a few minutes.</p>
                      </div>
                      <div className='text-white text-4xl px-16'>
                          <MdArrowOutward />
                      </div>
                    </div>
                </section>
            </DialogTrigger>
            <DialogContent className="p-12 h-[90rem] w-[80rem] border-none">
            <div className="rounded-lg w-full h-full flex items-center justify-center">
                <video 
                    src = {src} 
                    width = {width} 
                    height = {height}
                    poster = {poster}
                    
                    className='rounded-lg'
                    autoPlay
                />
            </div>
            </DialogContent>
        </Dialog>
  )
}
