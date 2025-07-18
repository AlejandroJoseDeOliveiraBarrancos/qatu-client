import { checkAuthToken, handleHashChange, hasPermission } from "../../AuthService";

describe("checkAuthToken", () => {
    const originalLocation = window.location;

    beforeEach(() => {
        delete window.location;
        window.location = { hash: "#/dashboard" };
        localStorage.clear();
    });

    afterEach(() => {
        window.location = originalLocation;
    });

    test("should redirect to #/login if authToken is missing and not on #/login", () => {
        localStorage.removeItem("authToken");
        window.location.hash = "#/dashboard";

        checkAuthToken();

        expect(window.location.hash).toBe("#/login");
    });

    test("should not redirect if authToken exists", () => {
        localStorage.setItem("authToken", "mockToken");
        window.location.hash = "#/dashboard";

        checkAuthToken();

        expect(window.location.hash).toBe("#/dashboard");
    });

    test("should not redirect if already on #/login", () => {
        localStorage.removeItem("authToken");
        window.location.hash = "#/login";

        checkAuthToken();

        expect(window.location.hash).toBe("#/login");
    });
});

describe("handleHashChange", () => {
    test("should call the router with the current hash location", () => {
        const mockRouter = jest.fn();
        window.location.hash = "#/home";

        handleHashChange(mockRouter);

        expect(mockRouter).toHaveBeenCalledWith("#/home");
    });
});

describe("hasPermission", () => {
    test("should return false if the route requires authentication but user is null", () => {
        const routeConfig = { requiresAuth: true };
        const user = null;
        const role = "user";

        const result = hasPermission(routeConfig, user, role);

        expect(result).toBe(false);
    });

    test("should return false if a specific role is required but user does not have it", () => {
        const routeConfig = { requiredRole: "admin" };
        const user = { name: "John" };
        const role = "user";

        const result = hasPermission(routeConfig, user, role);

        expect(result).toBe(false);
    });

    test("should return true if the route does not require authentication or a specific role", () => {
        const routeConfig = {};
        const user = null;
        const role = "user";

        const result = hasPermission(routeConfig, user, role);

        expect(result).toBe(true);
    });

    test("should return true if the route requires authentication and the user is authenticated", () => {
        const routeConfig = { requiresAuth: true };
        const user = { name: "John" };
        const role = "user";

        const result = hasPermission(routeConfig, user, role);

        expect(result).toBe(true);
    });

    test("should return true if the user has the required role", () => {
        const routeConfig = { requiredRole: "admin" };
        const user = { name: "John" };
        const role = "admin";

        const result = hasPermission(routeConfig, user, role);

        expect(result).toBe(true);
    });
});
