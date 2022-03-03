import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
import dotenv from 'dotenv';
dotenv.config();

export const endpoint =process.env.REACT_APP_CLIENT_ID;

export const adalConfig = {
    tenant: 'f962b9f9-e2d9-49ee-b98c-14b402f6a5df',
    clientId: '8e41eb93-e4de-40d5-8b83-b4ce7514c214',
    endpoints: {
        api: endpoint,
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);