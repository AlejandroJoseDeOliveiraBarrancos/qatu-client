import {
    fetchUsers,
    fetchCurrentUserProfile,
    createUser,
    updateUser,
    deleteUser,
  } from "../../UserService.js";
  import { createRequestManager } from "../../RequestManager.js";

  jest.mock("../../RequestManager.js", () => {
    const mockRequestManager = {
      baseUrl: "",
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      setAuthToken: jest.fn(),
    };
  
    return {
      createRequestManager: jest.fn(({ baseUrl }) => {
        mockRequestManager.baseUrl = baseUrl; 
        return mockRequestManager;
      }),
    };
  });
  
  describe("User Service", () => {
    let mockRequestManager;

    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });
  
    beforeEach(() => {
      mockRequestManager = createRequestManager({ baseUrl: "http://localhost:5162/api" });
  
      mockRequestManager.get.mockResolvedValue({});
      mockRequestManager.post.mockResolvedValue({});
      mockRequestManager.patch.mockResolvedValue({});
      mockRequestManager.delete.mockResolvedValue({});
  
      Storage.prototype.getItem = jest.fn(() => "mockAccessToken");
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
  
    test("fetchUsers realiza una solicitud GET a /Users con el token de autorización", async () => {
      const mockResponse = [{ id: 1, name: "John Doe" }];
      mockRequestManager.get.mockResolvedValue(mockResponse);
  
      const result = await fetchUsers();
  
      expect(mockRequestManager.get).toHaveBeenCalledWith("/Users", {
        headers: { Authorization: `Bearer mockAccessToken` },
      });
      expect(result).toEqual(mockResponse);
    });
  
    test("fetchCurrentUserProfile maneja la ausencia de token de acceso", async () => {
      Storage.prototype.getItem = jest.fn(() => null);
  
      await expect(fetchCurrentUserProfile()).rejects.toThrow(
        "No se encontró un token de acceso."
      );
    });
  
    test("fetchCurrentUserProfile realiza una solicitud GET a /Users/me con el token de autorización", async () => {
      const mockResponse = { id: 1, name: "John Doe" };
      mockRequestManager.get.mockResolvedValue(mockResponse);
  
      const result = await fetchCurrentUserProfile();
  
      expect(mockRequestManager.get).toHaveBeenCalledWith("/Users/me", {
        headers: { Authorization: `Bearer mockAccessToken` },
      });
      expect(result).toEqual(mockResponse);
    });
  
    test("fetchCurrentUserProfile maneja una respuesta vacía del servidor", async () => {
      mockRequestManager.get.mockResolvedValue(null);
  
      await expect(fetchCurrentUserProfile()).rejects.toThrow(
        "Respuesta vacía del servidor."
      );
    });
  
    test("createUser realiza una solicitud POST a /Users con el cuerpo y encabezados correctos", async () => {
      const newUser = { name: "Jane Doe" };
      const mockResponse = { id: 2, ...newUser };
      mockRequestManager.post.mockResolvedValue(mockResponse);
  
      const result = await createUser(newUser);
  
      expect(mockRequestManager.post).toHaveBeenCalledWith("/Users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer mockAccessToken`,
        },
        body: JSON.stringify(newUser),
      });
      expect(result).toEqual(mockResponse);
    });
  
    test("updateUser realiza una solicitud PATCH a /Users/:userId con el cuerpo y encabezados correctos", async () => {
      const updatedUser = { name: "John Smith" };
      const userId = 1;
      const mockResponse = { id: userId, ...updatedUser };
      mockRequestManager.patch.mockResolvedValue(mockResponse);
  
      const result = await updateUser(userId, updatedUser);
  
      expect(mockRequestManager.patch).toHaveBeenCalledWith(`/Users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer mockAccessToken`,
        },
        body: JSON.stringify(updatedUser),
      });
      expect(result).toEqual(mockResponse);
    });
  
    test("deleteUser realiza una solicitud DELETE a /Users/:userId con el encabezado de autorización", async () => {
      const userId = 1;
      const mockResponse = { success: true };
      mockRequestManager.delete.mockResolvedValue(mockResponse);
  
      const result = await deleteUser(userId);
  
      expect(mockRequestManager.delete).toHaveBeenCalledWith(`/Users/${userId}`, {
        headers: { Authorization: `Bearer mockAccessToken` },
      });
      expect(result).toEqual(mockResponse);
    });
  });
  