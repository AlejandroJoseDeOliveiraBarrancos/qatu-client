import { createRequestManager } from '../../RequestManager.js'

// Mock the fetch function
global.fetch = jest.fn();

describe('RequestManager', () => {
    const baseUrl = 'https://api.example.com/';
    const mockToken = 'mockAuthToken';

    let api;

    beforeEach(() => {
        api = createRequestManager({ baseUrl, authToken: mockToken });
        fetch.mockClear();
    });

    test('should create a request with default headers and authToken', async () => {
        const mockResponse = { data: 'success' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await api.get('test-endpoint');

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`
            }
        });
        expect(result).toEqual(mockResponse);
    });

    test('should handle a POST request with body', async () => {
        const mockResponse = { data: 'created' };
        const requestBody = { name: 'John Doe' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await api.post('test-endpoint', {
            body: JSON.stringify(requestBody)
        });

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`
            },
            body: JSON.stringify(requestBody)
        });
        expect(result).toEqual(mockResponse);
    });

    test('should handle a PATCH request with body', async () => {
        const mockResponse = { data: 'patched' };
        const requestBody = { name: 'Updated Name' };
    
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });
    
        const result = await api.patch('test-endpoint', {
            body: JSON.stringify(requestBody),
        });
    
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`,
            },
            body: JSON.stringify(requestBody),
        });
        expect(result).toEqual(mockResponse);
    });
    

    test('should handle a DELETE request and return json', async () => {
        const mockResponse = { data: 'deleted' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await api.delete('test-endpoint');

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`
            }
        });
        expect(result).toEqual(mockResponse);
    });

    test('should handle a request without authToken', async () => {
        const mockResponse = { data: 'updated' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });
        const apiWithoutToken = createRequestManager({ baseUrl, authToken: null });

        const result = await apiWithoutToken.post('test-endpoint', {
            body: JSON.stringify({ name: 'Updated Name' }),
        });

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Updated Name' }),
        });
        expect(result).toEqual(mockResponse);
    });

    test('should reject with error details when response is not ok', async () => {
        const mockErrorResponse = { error: 'Not Found' };
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: async () => mockErrorResponse
        });

        await expect(api.get('test-endpoint')).rejects.toEqual({
            status: 404,
            statusText: 'Not Found',
            body: mockErrorResponse
        });

        expect(fetch).toHaveBeenCalledWith(`${baseUrl}test-endpoint`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`
            }
        });
    });
});
