import './styles/App.css'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './components/Nav';

function Main() {
  const { isLoading } = useAuth0;

  if (isLoading) return <div>Loading....</div>

  return (
    <div className='container'>
      <Nav />
    </div>
  );
}

export default Main;
