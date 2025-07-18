import { CatalogModel } from "../models/CatalogModel.js";
import view from "../views/catalog/CatalogRegister.html";
import "../assets/styles/CatalogRegister.css";

export function initializeCatalogRegisterViewModel(container) {
    container.innerHTML = view;

    const form = container.querySelector("#register-catalog-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const catalogData = {
            name: form.name.value,
            description: form.description.value,
        };

        try {
            await CatalogModel.createCatalog(catalogData);
            alert("Catálogo registrado exitosamente.");
            form.reset();
        } catch (error) {
            console.error("Error al registrar el catálogo:", error);
            alert("Hubo un error al registrar el catálogo.");
        }
    });
}

export function integrateRegisterCatalog(marketViewElement) {
    const modal = marketViewElement.querySelector("#register-catalog-modal");
    const registerCatalogContainer = marketViewElement.querySelector("#register-catalog-container");
    const showRegisterCatalogBtn = marketViewElement.querySelector("#show-register-catalog-btn");
    const closeBtn = marketViewElement.querySelector("#close-register-catalog");

    if (!modal || !registerCatalogContainer || !showRegisterCatalogBtn || !closeBtn) {
        console.error("Faltan elementos necesarios para el modal.");
        return;
    }

    initializeCatalogRegisterViewModel(registerCatalogContainer);

    showRegisterCatalogBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        closeModal();
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
    }
}
