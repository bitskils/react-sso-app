// src/ProtectedRoute.js
import React from 'react';
import { useMsal, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if (inProgress === "startup" || inProgress === "login") {
        // Optionally, render a loading spinner or a blank page until authentication is checked
        return <div>Loading authentication state...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
