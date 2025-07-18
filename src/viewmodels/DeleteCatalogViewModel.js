import { fetchCatalogById, deleteCatalogById } from "../services/CatalogService.js";
import deleteCatalogTemplate from "../views/catalog/DeleteCatalog.html";
import "../assets/styles/DeleteCatalog.css";

export default async function deleteCatalogViewModel(catalogId) {
    const container = document.createElement("div");
    container.innerHTML = deleteCatalogTemplate;

    try {
        const catalogData = await fetchCatalogById(catalogId);
        const catalogTitleElement = container.querySelector("#delete-catalog-title");

        if (catalogData && catalogData.name) {
            catalogTitleElement.textContent = catalogData.name;
        } else {
            catalogTitleElement.textContent = "Catálogo no encontrado.";
        }

        const confirmButton = container.querySelector("#confirm-delete-btn");
        confirmButton.addEventListener("click", async () => {
            try {
                const result = await deleteCatalogById(catalogId);
                if (result.success) {
                    alert("Catálogo eliminado exitosamente.");
                    window.location.hash = "#/catalog-list"; 
                } else {
                    alert("Error inesperado al eliminar el catálogo.");
                }
            } catch (error) {
                console.error("Error en confirmación de eliminación:", error.message || error);
                alert("El catálogo no existe o ya fue eliminado.");
                window.location.hash = "#/catalog-list"; 
            }
        });

        const cancelButton = container.querySelector("#cancel-delete-btn");
        cancelButton.addEventListener("click", () => {
            window.location.hash = `#/catalog-view/${catalogId}`;
        });
    } catch (error) {
        console.error("Error en DeleteCatalogViewModel:", error);
        container.innerHTML = "<h1>Error al cargar la vista de eliminación de catálogo.</h1>";
    }

    return container;
}
