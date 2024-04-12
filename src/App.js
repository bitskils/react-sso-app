// src/App.js
import React from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile'; // Import the Profile component
import ApiComponent from './ApiComponent';

function Home() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.error(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.error(e);
            });
        }
    }

    return (
        <div>
            <h1>Home Page</h1>
            {!isAuthenticated ? (
                <button onClick={() => handleLogin("popup")}>Log in using Popup</button>
            ) : (
                <div>
                    <button onClick={() => instance.logout()}>Logout</button><br/>
                    <Link to="/profile">Go to Profile</Link><br/>
                    <Link to="/api-response">API Response</Link>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                 <Route path="/api-response" element={<ProtectedRoute><ApiComponent /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
