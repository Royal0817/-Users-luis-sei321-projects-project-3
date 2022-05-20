import './styles/App.css'
import React from 'react'
import Nav from './components/Nav';
// import { Routes, Route } from 'react-router-dom'
// import Map from './components/Map'
// import { withAuthenticationRequired } from '@auth0/auth0-react'
// import { Loading } from './'
// import { Link } from 'react-router-dom'
import { Outlet } from 'react-router'
import LoginButton from './components/LoginButton'

function Main() {
  return (
    <div className='SigninPage'>
      <Nav />
      <Outlet />
      <LoginButton />
    </div>
  );
}

export default Main;
