"use client"
import PasswordReset from '@/components/PasswordReset'
import VerificationCodeComponent from '@/components/VerificationCodeComponent'
import React, { useState } from 'react'

export default function () {
    const [successful, setSuccessful] = useState(false)

  return (
    <main className='w-full h-screen flex items-center bg-white'>
        {!successful && <VerificationCodeComponent setSuccessful={setSuccessful} />}
        {successful && <PasswordReset />}

    </main>
  )
}