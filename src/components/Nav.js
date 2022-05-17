import React from 'react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';



const Nav = () => {
  return (
    <div className='Nav'>
    <LoginButton />
    <LogoutButton />
    <Profile />
    </div>
  )
}

export default Nav