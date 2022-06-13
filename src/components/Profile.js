import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { name, picture } = user;
    return (
      isAuthenticated &&
      <>
        <div className='profile'>
          <h3 className='username'> Welcome {user.name}</h3>
          <img className='dot' src={user.picture} alt={user.name}/>
        </div>
        <LogoutButton />
        <LoginButton />
        </>
    )
}

export default Profile