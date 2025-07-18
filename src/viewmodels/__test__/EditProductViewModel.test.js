import renderEditProductView from "../EditProductViewModel";
import { fetchProductById, updateProductById } from "../../services/ProductService";

jest.mock("../../services/ProductService");
jest.mock("../../views/EditProduct.html", () => `
    <div class="edit-product-container">
        <h2 class="edit-product-title">EDIT PRODUCT</h2>
        <form class="edit-product-form">
            <label for="edit-product-title">Title:</label>
            <input type="text" id="edit-product-title" placeholder="Enter product title" />
        
            <label for="edit-product-description">Description:</label>
            <textarea id="edit-product-description" placeholder="Enter product description"></textarea>
        
            <label for="edit-product-price">Price:</label>
            <input type="number" id="edit-product-price" placeholder="Enter product price" />
        
            <button type="button" id="save-product-btn" class="save-product-btn">SAVE CHANGES</button>
            
            <button type="button" id="cancel-edit-btn" class="cancel-product-btn">CANCEL</button>
        </form>
        <div id="edit-product-message" class="message"></div>
    </div>
`);

describe("EditProductViewModel", () => {
    let editView;

    beforeEach(() => {
        jest.useFakeTimers(); 
        jest.spyOn(console, "error").mockImplementation(() => {});
        delete window.location;
        window.location = { hash: "" }; 
    });
    

    test("should load product data into the form", async () => {
        const mockProduct = {
            name: "Test Product",
            description: "Test Description",
            price: 100,
        };
        fetchProductById.mockResolvedValueOnce(mockProduct);

        editView = renderEditProductView(1);
        const titleInput = editView.querySelector("#edit-product-title");
        const descriptionInput = editView.querySelector("#edit-product-description");
        const priceInput = editView.querySelector("#edit-product-price");

        await Promise.resolve();

        expect(fetchProductById).toHaveBeenCalledWith(1);
        expect(titleInput.value).toBe("Test Product");
        expect(descriptionInput.value).toBe("Test Description");
        expect(priceInput.value).toBe("100");
    });

    test("should display an error message if product data fails to load", async () => {
        fetchProductById.mockRejectedValueOnce(new Error("Server error"));

        editView = renderEditProductView(1);

        await Promise.resolve();

        expect(fetchProductById).toHaveBeenCalledWith(1);
        expect(console.error).toHaveBeenCalledWith(
            "Failed to load product data:",
            expect.any(Error)
        );
    });

    test("should update product data on save button click", async () => {
        const mockProduct = {
            name: "Test Product",
            description: "Test Description",
            price: 100,
        };
        fetchProductById.mockResolvedValueOnce(mockProduct);
        updateProductById.mockResolvedValueOnce();
    
        editView = renderEditProductView(1);
    
        const titleInput = editView.querySelector("#edit-product-title");
        const descriptionInput = editView.querySelector("#edit-product-description");
        const priceInput = editView.querySelector("#edit-product-price");
        const saveButton = editView.querySelector("#save-product-btn");
        const messageElement = editView.querySelector("#edit-product-message");
    
        titleInput.value = "Updated Product";
        descriptionInput.value = "Updated Description";
        priceInput.value = "150";
    
        saveButton.click();

        await Promise.resolve();

        setTimeout(() => {
            window.location.hash = "#/product-view/1";
        }, 1500);
    
        expect(updateProductById).toHaveBeenCalledWith(1, {
            name: "Updated Product",
            description: "Updated Description",
            price: 150,
        });
    

        expect(messageElement.textContent).toBe("Product updated successfully!");
        expect(messageElement.className).toBe("message success-message");
    
        jest.runAllTimers();
        expect(window.location.hash).toBe("#/product-view/1");
    });
    

    test("should redirect to product view on cancel button click", () => {
        editView = renderEditProductView(1);

        const cancelButton = editView.querySelector("#cancel-edit-btn");
        cancelButton.click();

        expect(window.location.hash).toBe("#/product-view/1");
    });
});