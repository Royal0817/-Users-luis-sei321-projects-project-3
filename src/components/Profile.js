import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
    return (
      isAuthenticated &&
      <>
        <div className='profile'>
          <img className='dot' src={user.picture} alt={user.name}/>
          <h3> Welcome {user.name}</h3>
        
        <LoginButton />
        <LogoutButton />
        </div>
      </>
    )
}

export default Profile