import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
            <div className='flex justify-center items-center mb-4'>
                    <img width={{width:"100%"}} src="/img/logo/logo-light-mode.svg" alt='logo' />
                  </div>
                  
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
