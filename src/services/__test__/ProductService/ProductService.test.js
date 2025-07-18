import {
  fetchProducts,
  fetchProductById,
  registerProduct,
  updateProductById,
  deleteProductById,
  uploadImageToImgBB
} from "../../ProductService.js";

jest.mock("../../RequestManager.js", () => ({
  createRequestManager: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn()
  }))
}));

const mockRequestManager = require("../../RequestManager.js").createRequestManager();

beforeEach(() => {
  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => "mockedAccessToken"),
      setItem: jest.fn(),
      clear: jest.fn()
    },
    writable: true
  });

  jest.clearAllMocks();
});

describe("Product Service", () => {
  describe("updateProductById", () => {
    it("should update product by ID", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue({ id: 1, name: "Updated Product" })
        })
      );

      const result = await updateProductById(1, { name: "Updated Product" });

      expect(fetch).toHaveBeenCalledWith("http://localhost:5162/api/Products/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer mockedAccessToken"
        },
        body: JSON.stringify({ name: "Updated Product" })
      });
      expect(result).toEqual({ id: 1, name: "Updated Product" });
    });

    it("should throw an error when the request fails", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found"
        })
      );

      await expect(updateProductById(1, { name: "Invalid Product" })).rejects.toThrow(
        "Error: 404 - Not Found"
      );
    });
  });

  describe("deleteProductById", () => {
    it("should delete a product by ID", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 204
        })
      );

      const result = await deleteProductById(1);

      expect(fetch).toHaveBeenCalledWith("http://localhost:5162/api/Products/1", {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer mockedAccessToken"
        }
      });
      expect(result).toEqual({ success: true });
    });

    it("should throw an error when the delete request fails", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: jest.fn().mockResolvedValue({ message: "Bad Request" })
        })
      );

      await expect(deleteProductById(1)).rejects.toThrow("Bad Request");
    });
  });

  describe("uploadImageToImgBB", () => {
    it("should upload an image and return the URL", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValue({
            success: true,
            data: { url: "http://image.url" }
          })
        })
      );

      const result = await uploadImageToImgBB("data:image/png;base64,TEST_BASE64");

      expect(fetch).toHaveBeenCalledWith("https://api.imgbb.com/1/upload?key=4993dc231bc010b5bee01868a799384c", {
        method: "POST",
        body: new URLSearchParams({
          image: "TEST_BASE64"
        })
      });
      expect(result).toBe("http://image.url");
    });

    it("should throw an error if the upload fails due to API response", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValue({ success: false })
        })
      );

      await expect(uploadImageToImgBB("data:image/png;base64,TEST_BASE64")).rejects.toThrow(
        "Error al subir la imagen"
      );
    });
  });
});
