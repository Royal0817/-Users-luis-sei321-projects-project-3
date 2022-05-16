import './styles/App.css'
import React from 'react'
import Map from './components/Map'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './components/Nav';

function Main() {
  const { isLoading } = useAuth0;

  if (isLoading) return <div>Loading....</div>

  return (
    <>
    
      <Nav />
      

    </>
  );
}

export default Main;
