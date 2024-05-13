import React from 'react'
import { Button } from '../ui/button'

export default function Accordion() {
  return (
    <div className='space-y-4 w-96 h-screen flex flex-col justify-center'>
      <div className="collapse collapse-arrow bg-white">
        <input type="radio" name="my-accordion-2" /> 
        <div className="collapse-title text-xl font-medium">
            <h1>Some Heading Will Go Here</h1>
        </div>
            <div className="collapse-content flex justify-between items-center"> 
                <p>Some Content Will Go Here</p>
                <Button>Ok</Button>
            </div>
      </div>
      <div className="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
                 <h1>Some Heading Will Go Here</h1>
            </div>
            <div className="collapse-content flex justify-between items-center"> 
                <p>Some Content Will Go Here</p>
                <Button>Ok</Button>
            </div>
      </div>
      <div className="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-medium">
                <h1>Some Heading Will Go Here</h1>
            </div>
            <div className="collapse-content flex justify-between items-center"> 
                <p>Some Content Will Go Here</p>
                <Button>Ok</Button>
            </div>
      </div>
    </div>
  )
}
