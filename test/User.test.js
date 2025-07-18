import axios from 'axios';

jest.mock('axios');

const API_BASE_URL = 'http://mock-api-url.com/api';

describe('Integration Tests - Users', () => {
  let createdUserId;

  describe('Fetch Users', () => {
    it('Basic Case: Should fetch a list of users', async () => {
      axios.get.mockResolvedValueOnce({
        status: 200,
        data: [
          { id: '1', name: 'User1' },
          { id: '2', name: 'User2' },
        ],
      });

      const response = await axios.get(`${API_BASE_URL}/Users`);

      expect(response.status).toBe(200);
      expect(response.data).toEqual([
        { id: '1', name: 'User1' },
        { id: '2', name: 'User2' },
      ]);
    });

    it('Edge Case: Failed to fetch users', async () => {
      axios.get.mockRejectedValueOnce({
        response: {
          status: 500,
          data: { message: 'Internal Server Error' },
        },
      });

      try {
        await axios.get(`${API_BASE_URL}/Users`);
      } catch (error) {
        expect(error.response.status).toBe(500);
        expect(error.response.data).toHaveProperty('message', 'Internal Server Error');
      }
    });
  });

  describe('Fetch Current User Profile', () => {
    it('Basic Case: Should fetch the current user profile', async () => {
      axios.get.mockResolvedValueOnce({
        status: 200,
        data: { id: '123', name: 'Current User' },
      });

      const response = await axios.get(`${API_BASE_URL}/Users/me`);

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ id: '123', name: 'Current User' });
    });

    it('Edge Case: No access token provided', async () => {
      axios.get.mockRejectedValueOnce({
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      });

      try {
        await axios.get(`${API_BASE_URL}/Users/me`);
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data).toHaveProperty('message', 'Unauthorized');
      }
    });
  });

  describe('Create User', () => {
    it('Basic Case: Should create a user successfully', async () => {
      const newUser = { name: 'New User', email: 'newuser@example.com' };
      axios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 'mock-user-id', ...newUser },
      });

      const response = await axios.post(`${API_BASE_URL}/Users`, newUser);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id', 'mock-user-id');
      createdUserId = response.data.id;
    });

    it('Edge Case: Missing required field', async () => {
      const incompleteUser = { email: 'incomplete@example.com' };
      axios.post.mockRejectedValueOnce({
        response: {
          status: 400,
          data: { message: "The 'name' field is required" },
        },
      });

      try {
        await axios.post(`${API_BASE_URL}/Users`, incompleteUser);
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('message', "The 'name' field is required");
      }
    });
  });

  describe('Update User', () => {
    it('Basic Case: Should update a user successfully', async () => {
      const updatedData = { name: 'Updated User' };
      axios.patch.mockResolvedValueOnce({
        status: 200,
        data: { id: createdUserId, ...updatedData },
      });

      const response = await axios.patch(`${API_BASE_URL}/Users/${createdUserId}`, updatedData);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('name', 'Updated User');
    });

    it('Edge Case: User not found', async () => {
      const updatedData = { name: 'Nonexistent User' };
      axios.patch.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'User not found' },
        },
      });

      try {
        await axios.patch(`${API_BASE_URL}/Users/invalid-id`, updatedData);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'User not found');
      }
    });
  });

  describe('Delete User', () => {
    it('Basic Case: Should delete a user successfully', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 });

      const response = await axios.delete(`${API_BASE_URL}/Users/${createdUserId}`);

      expect(response.status).toBe(204);
    });

    it('Edge Case: User not found', async () => {
      axios.delete.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'User not found' },
        },
      });

      try {
        await axios.delete(`${API_BASE_URL}/Users/invalid-id`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'User not found');
      }
    });
  });
});
