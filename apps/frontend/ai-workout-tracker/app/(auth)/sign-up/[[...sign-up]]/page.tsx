import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <SignUp />
        </div>
    )
}

export default SignUpPage