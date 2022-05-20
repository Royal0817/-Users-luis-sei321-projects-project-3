import React from 'react'
// import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { Link } from 'react-router-dom'

const Nav = (props) => {
  return (
    <div className='nav'>
      <Link to='/'>
       <div>Home</div>
      </Link>
       <Link to='/signin'>
       <div>Reccomendations</div>
      </Link>
      <Profile />
      <LogoutButton />

     
    </div>
  )
}
export default Nav