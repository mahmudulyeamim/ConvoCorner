"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { emailSend } from './utils'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation'

export default function VerificationCodeComponent({ setSuccessful }) {
    const [code, setCode] = useState("")
    const { toast } = useToast()
    const router = useRouter()
    let token = null
    const min = 100000
    const max = 999999
    let randomSixDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min
    useEffect(() => {
      token = localStorage.getItem("token")
      token = JSON.parse(token)

      if(token == null) {
        router.push("/login")
      }
      emailSend(token?.email, null, `Your Verification Code is : ${randomSixDigitNumber}`, process.env.NEXT_PUBLIC_VERIFICATION_TEMPLATE_ID)
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
      const data = {
        code : randomSixDigitNumber.toString()
      }
      fetch(`${endpoint}/auth/reset-password/initiate`, {
          method: 'POST',
          headers : {'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token.accessToken,
                    },
          body : JSON.stringify(data)
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data)
          })
    }, [])


    function verificationCodeMatch() {
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
      token = localStorage.getItem("token")
      token = JSON.parse(token)
      console.log(token)
      if(token == null) {
        router.push("/login")
      }
      fetch(`${endpoint}/auth/reset-password/confirm?passcode=${code}`, {
          method: 'GET',
          headers : {'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token?.accessToken,
                     "ngrok-skip-browser-warning": "69420"
                
                }
      })
          .then((res) => res.json())
          .then((data) => {
              if(data.detail != 'Passcode does not match') {
                setSuccessful(true)
              }
              else {
                  toast({
                    title: "Invalid Verification Code Provided",
                    variant: 'error'
                  })
              }
          })
    }


  return (
    <>
          <div className="container bg-white">
          <div className="-mx-4 flex flex-wrap bg-white">
            <div className="w-full px-4 mt-8 bg-white">
              <div className="mx-auto max-w-[500px] rounded-md bg-[var(--d-g)] py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-xl font-bold text-white">
                  Enter The Verification Code Sent To Your Email
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-white sm:block"></span>
                </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Verification Code :
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Verification Code"
                      className="w-full bg-white rounded-md border border-gray-200 py-3 px-6 text-base text-black placeholder-body-color shadow-one outline-none focus:border-[var(--d-g)] focus-visible:shadow-none "
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <Button onClick={verificationCodeMatch} className="rounded-lg flex items-center w-full jusitfy-center mx-auto">
                    Send
                  </Button>
              </div>
            </div>
          </div>
        </div>
        
        
        <Toaster />
    </>
  )
}