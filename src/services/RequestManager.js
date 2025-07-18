export const createRequestManager = ({ baseUrl, authToken }) => {
    const createRequest = (method) => async (endpoint, options = {}) => {
        const url = `${baseUrl}${endpoint}`;

        const headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
        };

        const requestOptions = {
            ...options,
            method,
            headers
        };

        try {
            console.log("Sending request: " + JSON.stringify(requestOptions) + "\nto: " + url);
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText,
                    body: errorBody
                });
            }
            return await response.json().catch(() => ({}));
        } catch (error) {
            return Promise.reject({
                status: 'network_error',
                statusText: error.message,
                body: null
            });
        }
    };

    const setAuthToken = (newToken) => { 
        authToken = newToken;
        console.log("Set token for next requests: " + newToken);
    };

    return {
        get: createRequest('GET'),
        post: createRequest('POST'),
        put: createRequest('PUT'),
        patch: createRequest('PATCH'),
        delete: createRequest('DELETE'),
        setAuthToken
    };
};
