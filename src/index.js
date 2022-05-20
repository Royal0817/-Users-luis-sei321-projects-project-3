import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Main from './App';

import { Auth0Provider } from '@auth0/auth0-react'; 

 import SignIn from './components/SignIn.js'

 import { BrowserRouter as Router } from 'react-router-dom'
 import { Routes, Route } from 'react-router-dom'
  

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={`${window.location.origin}/signin`}
      >
          <Routes>
            <Route path='/' element={<Main />} >
              <Route path='signin/' element={<SignIn />} />
            </Route>
          </Routes>
        </Auth0Provider>
    </Router>

    </React.StrictMode>
);

