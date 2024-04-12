import { loginRequest, graphConfig } from './authConfig';

export async function fetchUserData(msalInstance, account) {
    const request = {
        ...loginRequest,
        account: account
    };

    try {
        const response = await msalInstance.acquireTokenSilent(request);
        const headers = new Headers();
        const bearer = `Bearer ${response.accessToken}`;
        headers.append("Authorization", bearer);

        const userOptions = {
            method: "GET",
            headers: headers
        };

        // Fetch user details
        const userResponse = await fetch(graphConfig.graphMeEndpoint, userOptions);
        const userData = await userResponse.json();

        // Attempt to fetch user profile picture
        try {
            const photoResponse = await fetch(`${graphConfig.graphMeEndpoint}/photo/$value`, userOptions);
            if (photoResponse.ok) {
                const imageBlob = await photoResponse.blob();
                userData.profileImage = URL.createObjectURL(imageBlob);
            } else {
                userData.profileImage = null;  // Handle cases where no photo is available
            }
        } catch (photoError) {
            console.error('Error fetching user photo:', photoError);
            userData.profileImage = null;  // Set image to null if there's any error
        }

        return userData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user data');
    }
}
