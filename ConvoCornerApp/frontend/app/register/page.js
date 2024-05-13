"use client"
import React from 'react'
import RegisterComponent from '@/components/RegisterComponent';

export default function page() {
  return (
    <main className={`w-full overflow-hidden h-screen bg-[#22193e]`}>
    <section className='h-screen flex mx-auto overflow-hidden items-center'>
        <RegisterComponent />
    </section>
    
  </main>
  )
}
