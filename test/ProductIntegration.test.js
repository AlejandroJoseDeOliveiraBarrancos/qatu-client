import { renderPage } from "../src/router/Router.js";
import { registerProduct, fetchProductById, deleteProductById } from "../src/services/ProductService.js";

jest.mock("../src/services/ProductService.js");

describe("Product Integration Tests", () => {
    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("should add a product successfully", async () => {
        const newProduct = {
            title: "Nuevo Producto",
            description: "Descripción del producto",
            price: 99.99,
        };

        registerProduct.mockResolvedValue({
            id: "12345",
            ...newProduct,
        });

        const app = document.createElement("div");
        app.innerHTML = `
            <form id="product-form">
                <input id="title" value="Nuevo Producto" />
                <textarea id="description">Descripción del producto</textarea>
                <input id="price" value="99.99" />
                <button type="submit" id="submit-btn">Añadir Producto</button>
            </form>
        `;
        document.body.appendChild(app);

        const form = app.querySelector("#product-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = app.querySelector("#title").value;
            const description = app.querySelector("#description").value;
            const price = parseFloat(app.querySelector("#price").value);
            registerProduct({ title, description, price });
        });

        form.dispatchEvent(new Event("submit"));

        expect(registerProduct).toHaveBeenCalledWith(newProduct);
        expect(registerProduct).toHaveBeenCalledTimes(1);
    });

    test("should display an error when adding a product with missing title", async () => {
        registerProduct.mockRejectedValue(new Error("Title is required"));

        const app = document.createElement("div");
        app.innerHTML = `
            <form id="product-form">
                <input id="title" value="" />
                <textarea id="description">Descripción del producto</textarea>
                <input id="price" value="99.99" />
                <button type="submit" id="submit-btn">Añadir Producto</button>
            </form>
        `;
        document.body.appendChild(app);

        const form = app.querySelector("#product-form");
        try {
            form.dispatchEvent(new Event("submit"));
        } catch (error) {
            expect(registerProduct).toHaveBeenCalled();
            expect(error.message).toBe("Title is required");
        }
    });

    describe("Integration Test - View Product Details", () => {
        test("should display product details", async () => {
            const product = {
                id: "12345",
                title: "Producto Existente",
                description: "Descripción del producto existente",
                price: 49.99,
                image: "https://via.placeholder.com/150",
            };

            fetchProductById.mockResolvedValue(product);

            document.body.innerHTML = `
                <div id="outside"></div>
                <div id="app">
                    <h1 id="product-title"></h1>
                    <p id="product-description"></p>
                    <span id="product-price"></span>
                </div>
            `;
            const app = document.getElementById("app");

            await renderPage("#/product-view/12345", app);

            expect(fetchProductById).toHaveBeenCalledWith("12345");
            expect(fetchProductById).toHaveBeenCalledTimes(1);
        });
    });

    describe("Integration Test - Delete Product", () => {
        test("should delete a product successfully", async () => {
            deleteProductById.mockResolvedValue({ success: true });

            const app = document.createElement("div");
            app.innerHTML = `
                <div id="product-12345">
                    <span>Producto Existente</span>
                    <button id="delete-btn">Eliminar</button>
                </div>
            `;
            document.body.appendChild(app);

            const deleteButton = app.querySelector("#delete-btn");
            deleteButton.addEventListener("click", () => {
                deleteProductById("12345");
                const productElement = app.querySelector("#product-12345");
                productElement.remove();
            });

            deleteButton.dispatchEvent(new Event("click"));

            expect(deleteProductById).toHaveBeenCalledWith("12345");
            expect(deleteProductById).toHaveBeenCalledTimes(1);

            const productElement = app.querySelector("#product-12345");
            expect(productElement).toBeNull();
        });

        test("should handle error when deleting a non-existent product", async () => {
            deleteProductById.mockRejectedValue({
                message: "Producto no encontrado",
                status: 404,
            });

            const app = document.createElement("div");
            app.innerHTML = `
                <div id="product-12345">
                    <span>Producto Existente</span>
                    <button id="delete-btn">Eliminar</button>
                </div>
            `;
            document.body.appendChild(app);

            const deleteButton = app.querySelector("#delete-btn");
            try {
                deleteButton.dispatchEvent(new Event("click"));
            } catch (error) {
                expect(deleteProductById).toHaveBeenCalledWith("12345");
                expect(deleteProductById).toHaveBeenCalledTimes(1);
                expect(error.message).toBe("Producto no encontrado");
            }
        });
    });
});
