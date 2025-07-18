import "../assets/styles/EditCatalog.css";
import editCatalogTemplate from "../views/catalog/EditCatalog.html";
import { fetchCatalogById, updateCatalogById } from "../services/CatalogService.js";

export default function EditCatalogView(catalogId) {
    const editViewElement = document.createElement("div");
    editViewElement.innerHTML = editCatalogTemplate;

    const nameInput = editViewElement.querySelector("#edit-catalog-name");
    const descriptionInput = editViewElement.querySelector("#edit-catalog-description");
    const saveButton = editViewElement.querySelector("#save-catalog-btn");
    const cancelButton = editViewElement.querySelector("#cancel-edit-btn");
    const messageElement = editViewElement.querySelector("#edit-catalog-message");

    loadCatalogData(catalogId, nameInput, descriptionInput);

    saveButton.addEventListener("click", async () => {
        const updatedData = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
        };

        try {
            await updateCatalogById(catalogId, updatedData);
            messageElement.textContent = "Catalog updated successfully!";
            messageElement.className = "message success-message";
            setTimeout(() => {
                window.location.hash = `#/catalog-view/${catalogId}`;
            }, 1500);
        } catch (error) {
            console.error("Error updating catalog:", error);
            messageElement.textContent = "Error updating catalog.";
            messageElement.className = "message error-message";
        }
    });

    cancelButton.addEventListener("click", () => {
        window.location.hash = `#/catalog-view/${catalogId}`;
    });

    return editViewElement;
}

async function loadCatalogData(catalogId, nameInput, descriptionInput) {
    try {
        const catalog = await fetchCatalogById(catalogId);
        nameInput.value = catalog.name || "";
        descriptionInput.value = catalog.description || "";
    } catch (error) {
        console.error("Failed to load catalog data:", error);
    }
}
