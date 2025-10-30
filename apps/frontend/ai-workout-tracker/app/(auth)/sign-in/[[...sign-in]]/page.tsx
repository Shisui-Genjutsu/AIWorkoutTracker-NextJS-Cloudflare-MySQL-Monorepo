import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <SignIn />
        </div>
    )
}

export default SignInPage