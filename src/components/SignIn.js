import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './Profile'

function SignIn() {
    const { user, isAuthenticated } = useAuth0()
    return (
        <Profile />
       )
}

export default SignIn