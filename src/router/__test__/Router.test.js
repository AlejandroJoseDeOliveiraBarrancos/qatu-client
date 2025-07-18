import { renderPage, navigate } from "../Router.js";
import routes from "../RouteManager.js";
import { hasPermission } from "../../services/AuthService.js";

// Mock the dependencies
jest.mock("../RouteManager.js");
jest.mock("../../services/AuthService.js");

describe("Router Tests", () => {
    let app, outside;

    beforeEach(() => {
        // Set up DOM elements
        document.body.innerHTML = `
            <div id="outside"></div>
            <div id="app"></div>
        `;
        app = document.getElementById("app");
        outside = document.getElementById("outside");

        // Mock routes
        routes["#/unauthorized"] = { view: jest.fn(() => document.createElement("div")) };
        routes["#/test-route"] = { view: jest.fn(() => document.createElement("div")), requiresAuth: true };
        routes["#/public-route"] = { view: jest.fn(() => document.createElement("div")), requiresAuth: false };
        routes['#/edit-product/:id'] = { view: jest.fn(() => document.createElement("div")), requiresAuth: true };
        routes['#/catalogs/delete/:id'] = { view: jest.fn(() => document.createElement("div")), requiresAuth: true }
        routes["#/catalogs/view/:id"] = { view: jest.fn(() => document.createElement("div")), requiresAuth: true }

        jest.clearAllMocks();
    });

    test("renders 404 for an unknown route", async () => {
        await renderPage("#/unknown", null, null);

        expect(app.innerHTML).toBe("<h1>404 - Page Not Found</h1>");
        expect(outside.innerHTML).toBe("");
    });

    test("renders unauthorized page when user lacks permission", async () => {
        hasPermission.mockReturnValue(false);

        await renderPage("#/test-route", { id: 1 }, "USER");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/test-route"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/unauthorized"].view).toHaveBeenCalled();
    });

    test("renders protected route when user has permission", async () => {
        hasPermission.mockReturnValue(true);

        await renderPage("#/test-route", { id: 1 }, "USER");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/test-route"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/test-route"].view).toHaveBeenCalled();
    });

    test("renders public route without authentication", async () => {
        await renderPage("#/public-route", null, null);

        expect(app.innerHTML).toBe("");
        expect(outside.childNodes.length).toBe(1);
        expect(routes["#/public-route"].view).toHaveBeenCalled();
    });

    test("navigate updates the window location hash", () => {
        const testRoute = "#/test-route";
        navigate(testRoute);

        expect(window.location.hash).toBe(testRoute);
    });
    test("renders unauthorized for an admin-only route when user lacks role", async () => {
        hasPermission.mockReturnValue(false);

        await renderPage("#/edit-product/:id", { id: 123 }, "USER");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/edit-product/:id"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/unauthorized"].view).toHaveBeenCalled();
    });

    test("renders edit product page when user is an admin", async () => {
        hasPermission.mockReturnValue(true);

        await renderPage("#/edit-product/:id", { id: 123 }, "ADMIN");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/edit-product/:id"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/edit-product/:id"].view).toHaveBeenCalled();
    });

    test("renders public catalog route", async () => {
        await renderPage("#/catalogs/view/:id", { id: 456 }, null);

        expect(app.childNodes.length).toBe(1);
        expect(routes["#/catalogs/view/:id"].view).toHaveBeenCalled();
    });

    test("renders unauthorized for catalog delete when user lacks role", async () => {
        hasPermission.mockReturnValue(false);

        await renderPage("#/catalogs/delete/:id", { id: 789 }, "USER");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/catalogs/delete/:id"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/unauthorized"].view).toHaveBeenCalled();
    });

    test("renders catalog delete page when user is an admin", async () => {
        hasPermission.mockReturnValue(true);

        await renderPage("#/catalogs/delete/:id", { id: 789 }, "ADMIN");

        expect(hasPermission).toHaveBeenCalledWith(routes["#/catalogs/delete/:id"]);
        expect(app.childNodes.length).toBe(1);
        expect(routes["#/catalogs/delete/:id"].view).toHaveBeenCalled();
    });
});
