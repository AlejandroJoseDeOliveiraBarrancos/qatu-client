import "../assets/styles/EditProduct.css";
import editProductTemplate from "../views/EditProduct.html";
import { fetchProductById, updateProductById } from "../services/ProductService.js";

export default function renderEditProductView(productId) {
    const editViewElement = document.createElement("div");
    editViewElement.innerHTML = editProductTemplate;

    const titleInput = editViewElement.querySelector("#edit-product-title");
    const descriptionInput = editViewElement.querySelector("#edit-product-description");
    const priceInput = editViewElement.querySelector("#edit-product-price");
    const saveButton = editViewElement.querySelector("#save-product-btn");
    const cancelButton = editViewElement.querySelector("#cancel-edit-btn"); 
    const messageElement = editViewElement.querySelector("#edit-product-message");

    loadProductData(productId, titleInput, descriptionInput, priceInput);

    saveButton.addEventListener("click", async () => {
        const updatedData = {
            name: titleInput.value.trim(), 
            description: descriptionInput.value.trim(),
            price: parseFloat(priceInput.value),
        };

        try {
            await updateProductById(productId, updatedData);
            messageElement.textContent = "Product updated successfully!";
            messageElement.className = "message success-message";
            setTimeout(() => {
                window.location.hash = `#/product-view/${productId}`;
            }, 1500);
        } catch (error) {
            console.error("Error updating product:", error);
            messageElement.textContent = "Error updating product.";
            messageElement.className = "message error-message";
        }
    });

    cancelButton.addEventListener("click", () => {
        window.location.hash = `#/product-view/${productId}`;
    });

    return editViewElement;
}

async function loadProductData(productId, titleInput, descriptionInput, priceInput) {
    try {
        const product = await fetchProductById(productId);
        titleInput.value = product.name || "";
        descriptionInput.value = product.description || "";
        priceInput.value = product.price || 0;
    } catch (error) {
        console.error("Failed to load product data:", error);
    }
}
