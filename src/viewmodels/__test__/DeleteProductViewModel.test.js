import deleteProductViewModel from "../DeleteProductViewModel";
import { fetchProductById, deleteProductById } from "../../services/ProductService";

jest.mock("../../services/ProductService");
jest.mock("../../views/DeleteProduct.html", () => `
    <div id="delete-product-container" class="delete-product-container">
        <h2>ARE YOU SURE OF DELETE THIS THIS PRODUCT?</h2>
        <p>Product: <span id="delete-product-title"></span></p>
        <div class="delete-product-buttons">
            <button id="confirm-delete-btn" class="btn-delete">YES, DELETE PRODUCT</button>
            <button id="cancel-delete-btn" class="btn-cancel">NO, KEEP PRODUCT</button>
        </div>
    </div>
`);

describe("DeleteProductViewModel", () => {
    beforeEach(() => {
        delete window.location;
        window.location = { hash: "" }; 
        jest.clearAllMocks();
    });

    test("should display product name correctly when product exists", async () => {
        const mockProduct = { name: "Test Product" };
        fetchProductById.mockResolvedValueOnce(mockProduct);

        const view = await deleteProductViewModel(1);
        const productTitle = view.querySelector("#delete-product-title");

        expect(fetchProductById).toHaveBeenCalledWith(1);
        expect(productTitle.textContent).toBe("Test Product");
    });

    test("should show 'Producto no encontrado.' when product does not exist", async () => {
        fetchProductById.mockResolvedValueOnce(null);

        const view = await deleteProductViewModel(1);
        const productTitle = view.querySelector("#delete-product-title");

        expect(fetchProductById).toHaveBeenCalledWith(1);
        expect(productTitle.textContent).toBe("Producto no encontrado.");
    });

    test("should handle confirm delete button click and delete product", async () => {
        const mockProduct = { name: "Test Product" };
        fetchProductById.mockResolvedValueOnce(mockProduct);
        deleteProductById.mockResolvedValueOnce({ success: true });

        const view = await deleteProductViewModel(1);
        const confirmButton = view.querySelector("#confirm-delete-btn");
        const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

        confirmButton.click();
        await Promise.resolve();

        expect(deleteProductById).toHaveBeenCalledWith(1);
        expect(alertSpy).toHaveBeenCalledWith("Producto eliminado exitosamente.");
        expect(window.location.hash).toBe("#/market-view");
    });

    test("should handle cancel delete button click", async () => {
        const mockProduct = { name: "Test Product" };
        fetchProductById.mockResolvedValueOnce(mockProduct);

        const view = await deleteProductViewModel(1);
        const cancelButton = view.querySelector("#cancel-delete-btn");

        cancelButton.click();

        expect(window.location.hash).toBe("#/product-view/1");
    });

    test("should handle confirm delete button click and show error if deletion fails", async () => {
        const mockProduct = { name: "Test Product" };
        fetchProductById.mockResolvedValueOnce(mockProduct);
        deleteProductById.mockResolvedValueOnce({ success: false });

        const view = await deleteProductViewModel(1);
        const confirmButton = view.querySelector("#confirm-delete-btn");
        const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

        confirmButton.click();
        await Promise.resolve();

        expect(alertSpy).toHaveBeenCalledWith("Error inesperado al eliminar el producto.");
    });

    test("should show error message if fetchProductById fails", async () => {
        fetchProductById.mockRejectedValueOnce(new Error("Server error"));

        const view = await deleteProductViewModel(1);

        expect(view.innerHTML).toContain("Error al cargar la vista de eliminación de producto.");
    });
});