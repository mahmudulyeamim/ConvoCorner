"use client"
import React from 'react'
import LoginComponent from '@/components/LoginComponent';

export default function page() {
  return (
    <main className={`w-full overflow-hidden h-screen bg-[#1c1c1c]`}>
    <section className='h-screen flex mx-auto overflow-hidden items-center'>
        <LoginComponent />
    </section>
    
  </main>
  )
}
