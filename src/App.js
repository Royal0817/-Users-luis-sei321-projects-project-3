import './styles/App.css'
import React from 'react'
import Nav from './components/Nav';
// import { Routes, Route } from 'react-router-dom'
import Map from './components/Map'
// import { withAuthenticationRequired } from '@auth0/auth0-react'
// import { Loading } from './'
// import { Link } from 'react-router-dom'
import { Outlet } from 'react-router'
import LoginButton from './components/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import SignIn from './components/SignIn'

function Main() {
  const {isAuthenticated} = useAuth0()
  if (isAuthenticated) 
  return (
    
    <>
      <div className='Nav-Bar'>
        <Outlet />
        <Nav />
        <LoginButton />
      </div>
      
      <div className='mapContainerStyle'>
        <Map />
      </div>
    </>) 
    if(!isAuthenticated) return (
      <>
      <h1> Sign in to get started </h1>
      <SignIn />
      </>
    )

}

export default Main;
