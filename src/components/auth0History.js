import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Main from './App';

const Auth0ProviderWithHistory = ({ childrenv }) => {
    const history = useNavigate();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return ( 
        
    )
}
        

    
