import React from 'react'
// import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
// import Profile from './Profile';
import { Link } from 'react-router-dom'

const Nav = (props) => {
  return (
    <div className='nav'>
      <Link to='/'>
       <div>Home</div>
      </Link>
      <LogoutButton />

     
    </div>
  )
}
export default Nav
// export default withAuthenticationRequired(Nav, {onRedirecting: () => <h1>hello world</h1> })