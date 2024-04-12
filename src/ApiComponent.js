// src/ApiComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

function ApiComponent() {
    const [message, setMessage] = useState('');
    const { instance, accounts } = useMsal();

    useEffect(() => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        instance.acquireTokenSilent(request).then(response => {
            axios.get('http://localhost:5000/api/sample', {
                headers: {
                    Authorization: `Bearer ${response.accessToken}`
                }
            })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        });
    }, [instance, accounts]);

    return (
        <div>
            <h1>API Response</h1>
            <p>{message}</p>
        </div>
    );
}

export default ApiComponent;
