"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function RegisterComponent() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    async function loginHandler() {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/users`
        const data = {
            name : name,
            email : email,
            password : password
        }
        console.log(data)
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
            router.push(`/`)
        }
        setLoading(false)
    }

  return (
    <div className='w-full bg-[var(--bg-c1)] h-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center p-8 rounded-md w-[30rem] bg-white'>
                <h1 className='text-black text-2xl 3xl:text-3xl font-semibold my-8'>Create Account From Here</h1>
                <div className='flex flex-col sm:my-2 w-full'>
                    <label  htmlFor="name" className='text-black text-lg 3xl:text-xl my-4'>Name<span className='text-red-700 mx-1'>*</span></label>
                    <input value={name} type="text" placeholder="Enter your Name" className='border-2 border-gray-200 bg-white px-8 py-2 sm:py-4 w-full focus:border-[#227f7e] rounded-lg focus:outline-none' onChange={e => setName(e.target.value)} />
                </div>
                <div className='flex flex-col sm:my-2 w-full'>
                    <label  htmlFor="email" className='text-black text-lg 3xl:text-xl my-4'>Email<span className='text-red-700 mx-1'>*</span></label>
                    <input value={email} type="text" placeholder="Enter your Email" className='border-2 border-gray-200 bg-white px-8 py-2 sm:py-4 w-full focus:border-[#227f7e] rounded-lg focus:outline-none' onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='flex flex-col my-2 w-full'>
                    <label  htmlFor="password" className='text-black text-lg 3xl:text-xl my-4'>Password<span className='text-red-700 mx-1'>*</span></label>
                    <input type="password" value={password} placeholder="Enter your password" className='border-2 border-gray-200 bg-white px-8 py-4 w-full focus:border-[#227f7e] rounded-lg focus:outline-none' onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='w-full my-8'>
                    <Button onClick={loginHandler} 
                    className={`w-full rounded-lg py-6 text-lg text-white bg-[#227f7e]`} disabled = {email == "" || password == "" || name == ""}>{loading && <span className='loading loading-spinner text-sm bg-white mr-4'></span>}Create Account</Button>      
                </div>
                <h1>Already have an account? <a href="/" className='text-[#227f7e]'>Sign In</a></h1>

            </div>
            <Toaster />
        </div>
  )
}
