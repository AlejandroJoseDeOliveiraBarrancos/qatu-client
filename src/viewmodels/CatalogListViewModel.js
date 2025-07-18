import { registerCatalog, fetchCatalogs } from "../services/CatalogService.js"; 
import catalogListTemplate from "../views/catalog/CatalogList.html"; 
import "../assets/styles/CatalogList.css"; 

export default async function catalogListViewModel() {
    const container = document.createElement("div");
    container.innerHTML = catalogListTemplate;

    const catalogListElement = container.querySelector("#catalog-list");
    const backButton = container.querySelector(".back-button");
    const createCatalogButton = container.querySelector("#create-catalog-btn");
    const closeModal = container.querySelector("#close-modal");

    const modal = container.querySelector("#register-catalog-modal");
    const form = modal.querySelector("#register-catalog-form");

    backButton.addEventListener("click", () => {
        window.location.hash = "#/market-view"; 
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; 
    });

    createCatalogButton.addEventListener("click", () => {
        modal.style.display = "block"; 
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; 
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const catalogData = {
            name: form.name.value,
            description: form.description.value,
        };

        try {
            await registerCatalog(catalogData);
            alert("Catálogo registrado exitosamente.");
            modal.style.display = "none"; 
            form.reset(); 
            loadCatalogList(); 
        } catch (error) {
            console.error("Error al registrar el catálogo:", error);
            alert("Hubo un error al registrar el catálogo.");
        }
    });

    async function loadCatalogList() {
        try {
            const catalogs = await fetchCatalogs(); 
            catalogListElement.innerHTML = ""; 
            if (catalogs && catalogs.length > 0) {
                catalogs.forEach(catalog => {
                    const catalogItem = document.createElement("div");
                    catalogItem.className = "catalog-item";

                    catalogItem.innerHTML = `
                        <h2>${catalog.name}</h2>
                        <p>${catalog.description}</p>
                        <a href="#/edit-catalog/${catalog.id}" class="edit-btn">Editar</a>
                        <a href="#/delete-catalog/${catalog.id}" class="delete-btn">Eliminar</a>
                    `;
                    catalogListElement.appendChild(catalogItem);
                });
            } else {
                catalogListElement.innerHTML = "<p>No hay catálogos disponibles.</p>";
            }
        } catch (error) {
            console.error("Error cargando la lista de catálogos:", error);
            catalogListElement.innerHTML = "<p>Error al cargar los catálogos.</p>";
        }
    }

    loadCatalogList();

    return container;
}
