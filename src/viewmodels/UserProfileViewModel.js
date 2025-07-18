import userProfileTemplate from "../views/UserProfile.html";
import "../assets/styles/UserProfile.css";
import { fetchCurrentUserProfile, updateUser } from "../services/UserService.js";

export default async (container) => {
    try {
        if (!container) {
            throw new Error("El contenedor no fue proporcionado o es inválido.");
        }

        container.innerHTML = userProfileTemplate;

        const userData = await fetchCurrentUserProfile();
        if (userData) {
            renderUserProfile(container, userData);
            attachEditEvent(container, userData);
            attachBackToMarketEvent(container);
        } else {
            container.innerHTML = "<p>Error al cargar el perfil del usuario.</p>";
        }
    } catch (error) {
        console.error("Error al cargar el perfil del usuario:", error);
        container.innerHTML = "<p>Error al cargar el perfil del usuario.</p>";
    }
};

export const renderUserProfile = (container, userData) => {
    const userNameElement = container.querySelector("#user-name");
    const userEmailElement = container.querySelector("#user-email");
    const editProfileButton = container.querySelector("#edit-profile-btn");

    if (userNameElement) userNameElement.textContent = userData.username || "Nombre no disponible";
    if (userEmailElement) userEmailElement.textContent = userData.email || "Correo no disponible";

    if (editProfileButton) {
        editProfileButton.addEventListener("click", () => {
            toggleEditForm(container, userData);
        });
    }
};

const toggleEditForm = (container, userData) => {
    const editForm = container.querySelector("#edit-form");
    const userNameInput = container.querySelector("#edit-username");
    const userEmailInput = container.querySelector("#edit-email");
    const backToMarketButton = container.querySelector("#back-to-market-btn");

    if (!editForm) {
        console.error("Formulario de edición no encontrado.");
        return;
    }

    userNameInput.value = userData.username;
    userEmailInput.value = userData.email;

    if (editForm.style.display === "none" || !editForm.style.display) {
        editForm.style.display = "block";
        if (backToMarketButton) backToMarketButton.style.display = "none";
    } else {
        editForm.style.display = "none";
        if (backToMarketButton) backToMarketButton.style.display = "block"; 
    }
};


const attachEditEvent = (container, userData) => {
    const saveButton = container.querySelector("#save-profile-btn");
    const cancelButton = container.querySelector("#cancel-edit-btn");
    const backToMarketButton = container.querySelector("#back-to-market-btn");

    if (saveButton) {
        saveButton.addEventListener("click", async () => {
            const userNameInput = container.querySelector("#edit-username").value.trim();
            const emailInput = container.querySelector("#edit-email").value.trim();

            const updatedData = {};
            if (userNameInput && userNameInput !== userData.username) {
                updatedData.username = userNameInput; 
            }
            if (emailInput && emailInput !== userData.email) {
                updatedData.email = emailInput; 
            }

            if (Object.keys(updatedData).length === 0) {
                alert("No hay cambios para guardar.");
                return;
            }

            try {
                await updateUser(userData.id, updatedData); 
                alert("Perfil actualizado con éxito.");
                window.location.reload(); 
            } catch (error) {
                console.error("Error actualizando el perfil:", error);
                alert("Error actualizando el perfil: " + (error.body?.message || "Error desconocido."));
            }
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            const editForm = container.querySelector("#edit-form");
            if (editForm) editForm.style.display = "none";
            if (backToMarketButton) backToMarketButton.style.display = "block"; 
        });
    }
};


const attachBackToMarketEvent = (container) => {
    const backToMarketButton = container.querySelector("#back-to-market-btn");

    if (backToMarketButton) {
        backToMarketButton.addEventListener("click", () => {
            window.location.hash = "#/market-view"; 
        });
    } else {
        console.error("Botón de 'Volver' no encontrado en el DOM.");
    }
};
