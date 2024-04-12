// src/Profile.js
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { fetchUserData } from './fetchUserData';

function Profile() {
    const { accounts, instance } = useMsal();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            if (accounts.length > 0) {
                try {
                    const data = await fetchUserData(instance, accounts[0]);
                    setUserData(data);
                } catch (e) {
                    console.error('Failed to fetch user data', e);
                }
            }
        }

        getUserData();
    }, [accounts, instance]);

    return (
        <div>
            <h2>Profile Page</h2>
            {userData ? (
                <div>
                    <p><strong>Name:</strong> {userData.displayName}</p>
                    <p><strong>Email:</strong> {userData.mail || userData.userPrincipalName}</p>
                    {userData.profileImage && <img src={userData.profileImage} alt="Profile" />}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
}

export default Profile;
