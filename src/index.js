// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.handleRedirectPromise()
    .then((response) => {
        // Log or handle the response as needed
        if (response) {
            console.log('Redirect response received:', response);
        }
        // Ensure MSAL is fully initialized before rendering the React app
        ReactDOM.render(
            <React.StrictMode>
                <MsalProvider instance={msalInstance}>
                    <App />
                </MsalProvider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    })
    .catch((error) => {
        console.error('Redirect error', error);
        // Handle or log error appropriately
        // Still render the application even if redirect fails
        ReactDOM.render(
            <React.StrictMode>
                <MsalProvider instance={msalInstance}>
                    <App />
                </MsalProvider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    });
