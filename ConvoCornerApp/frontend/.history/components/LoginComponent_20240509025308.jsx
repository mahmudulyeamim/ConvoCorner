"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function loginHandler() {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/login`
        const data = {
            username : username,
            password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(data)
        })
        const ans = await response.json()
        const id = ans?.id
        if(id != null) {
            localStorage.setItem("token", JSON.stringify(ans))
            router.push(`/chat`)
        }
        
      setLoading(false)
    }

  return (
    <div className='w-full bg-[var(--bg-c1)] h-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center p-8 rounded-md bg-white'>
                <h1 className='text-black text-2xl 3xl:text-3xl font-semibold my-8'>Login First To Your Account</h1>
                <div className='flex flex-col sm:my-2 w-full'>
                    <label  htmlFor="email" className='text-black text-lg 3xl:text-xl my-4'>Email<span className='text-red-700 mx-1'>*</span></label>
                    <input type="text" value={username} placeholder="Enter Your Email" className='border-2 border-gray-200 bg-white px-8 py-2 sm:py-4 w-full focus:border-[#227f7e] rounded-lg focus:outline-none' onChange={e => setUsername(e.target.value)} />
                </div>
                <div className='flex flex-col my-2 w-full'>
                    <label  htmlFor="password" className='text-black text-lg 3xl:text-xl my-4'>Password<span className='text-red-700 mx-1'>*</span></label>
                    <input type="password" placeholder="Enter your password" className='border-2 border-gray-200 bg-white px-8 py-4 w-full focus:border-[#227f7e] rounded-lg focus:outline-none' onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4 my-2'>
                        <input type="checkbox" className='checkbox border border-gray-300' />
                        <label htmlFor="remember" className='text-black'>Remember Me</label>    
                    </div>
                    <a href="#" className='text-[#227f7e]'>Forgot Password?</a>
                </div>
                <div className='w-full my-8'>
                    <Button onClick={loginHandler} 
                    className={`w-full rounded-lg py-6 text-lg text-white bg-[#227f7e]`} disabled = {username == "" || password == ""}>{loading && <span className='loading loading-spinner text-sm bg-white mr-4'></span>}Login</Button>      
                </div>
                <h1>Don't have an account? <a href="/register" className='text-[#227f7e]'>Sign Up</a></h1>

            </div>
            <Toaster />
        </div>
  )
}
