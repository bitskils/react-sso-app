// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the React App</h1>
            <nav>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/api-response">API Response</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
