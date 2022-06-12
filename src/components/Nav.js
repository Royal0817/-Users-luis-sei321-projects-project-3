import React from 'react'

// import LogoutButton from './LogoutButton';
// import LoginButton from './LoginButton';
import Profile from './Profile';
import { Link } from 'react-router-dom'
// import PlacesAutocomplete from './Map'

const Nav = (props) => {
  return (
    <>

      <Link to='/'>
        <div>Home</div>
      </Link>

      <Link to='/signin'>
        <div>Reccomendations</div>
      </Link>

      <div>
        <Profile />
        {/* <PlacesAutocomplete setMarkerSelected={setMarkerSelected} /> */}
      </div>
    </>
  )
}
export default Nav
