export const msalConfig = {
      
    auth: {
        clientId: "APP-ID",
        authority: "https://login.microsoftonline.com/CLIENT-ID",
        redirectUri: "http://localhost:3000/"
    },
    
 
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

export const loginRequest = {
   scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
