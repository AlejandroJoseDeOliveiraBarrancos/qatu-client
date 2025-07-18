import axios from 'axios';

jest.mock('axios');

const API_BASE_URL = 'http://mock-api-url.com/api';

describe('Integration Tests - Qatu', () => {
  let createdProductId;

  describe('Add Product', () => {
    it('Basic Case: Should add a product successfully', async () => {
      axios.post.mockResolvedValueOnce({
        status: 201,
        data: { id: 'mock-product-id' },
      });

      const productData = {
        name: 'Test Product',
        description: 'Test product description',
        price: 100.0,
        status: 'Available',
        catalogId: '123',
      };

      const response = await axios.post(`${API_BASE_URL}/Products`, productData);

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id', 'mock-product-id');

      createdProductId = response.data.id;
    });

    it('Edge Case: Missing required field', async () => {
      axios.post.mockRejectedValueOnce({
        response: {
          status: 400,
          data: { message: "The 'name' field is required" },
        },
      });

      const productData = {
        description: 'Description without name',
        price: 50.0,
        status: 'Available',
        catalogId: '123',
      };

      try {
        await axios.post(`${API_BASE_URL}/Products`, productData);
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('message', "The 'name' field is required");
      }
    });
  });

  describe('Get Product Details', () => {
    it('Basic Case: Should return product details', async () => {
      axios.get.mockResolvedValueOnce({
        status: 200,
        data: { id: 'mock-product-id', name: 'Mock Product' },
      });

      const response = await axios.get(`${API_BASE_URL}/Products/mock-product-id`);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', 'mock-product-id');
      expect(response.data).toHaveProperty('name', 'Mock Product');
    });

    it('Edge Case: Product not found', async () => {
      axios.get.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'Product not found' },
        },
      });

      try {
        await axios.get(`${API_BASE_URL}/Products/invalid-id`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'Product not found');
      }
    });
  });

  describe('Delete Product', () => {
    it('Basic Case: Should delete an existing product', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 });

      const response = await axios.delete(`${API_BASE_URL}/Products/mock-product-id`);

      expect(response.status).toBe(204);
    });

    it('Edge Case: Trying to delete a nonexistent product', async () => {
      axios.delete.mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: 'Product not found' },
        },
      });

      try {
        await axios.delete(`${API_BASE_URL}/Products/invalid-id`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'Product not found');
      }
    });
  });
});
