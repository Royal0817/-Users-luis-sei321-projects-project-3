import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './App';
import Map from './components/Map'
import { Auth0Provider } from '@auth0/auth0-react'; 


// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// console.log(domain)
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
      <Auth0Provider
          domain='dev-1qstcv1r.us.auth0.com'
          clientId='2aeUm3Gja9Cv9T5NrpEHWEU8nD1w4yJS'
          redirectUri={window.location.origin}
        >
        <Main />
        </Auth0Provider>
        <Map />

    </React.StrictMode>
);

