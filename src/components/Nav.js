import React from 'react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';


const Nav = () => {
  return (
    <>
    <LoginButton />
    <LogoutButton />
    <Profile />
    </>
  )
}

export default Nav