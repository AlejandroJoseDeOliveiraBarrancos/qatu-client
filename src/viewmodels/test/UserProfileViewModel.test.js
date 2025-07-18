import userProfile from "../UserProfileViewModel";
import { renderUserProfile, attachEditEvent, attachBackToMarketEvent } from "../UserProfileViewModel";
import { fetchCurrentUserProfile, updateUser } from "../../services/UserService";

jest.mock("../../services/UserService", () => ({
    fetchCurrentUserProfile: jest.fn(),
    updateUser: jest.fn(),
}));

describe("UserProfileViewModel", () => {
    let container;

    beforeEach(() => {
        // Crear un contenedor de DOM simulado
        container = document.createElement("div");
        document.body.appendChild(container);
        container.innerHTML = `
            <div id="user-profile">
                <p id="user-name"></p>
                <p id="user-email"></p>
                <button id="edit-profile-btn"></button>
                <div id="edit-form" style="display: none;">
                    <input id="edit-username" />
                    <input id="edit-email" />
                    <button id="save-profile-btn"></button>
                    <button id="cancel-edit-btn"></button>
                </div>
                <button id="back-to-market-btn"></button>
            </div>
        `;
    });

    afterEach(() => {
        // Limpiar el DOM después de cada prueba
        document.body.innerHTML = "";
        jest.clearAllMocks();
    });


    it("should render error message if user data cannot be loaded", async () => {
        fetchCurrentUserProfile.mockResolvedValue(null);

        await userProfile(container);

        expect(container.innerHTML).toContain("<p>Error al cargar el perfil del usuario.</p>");
    });

    it("should render 'Nombre no disponible' if username is missing", () => {
        const mockUserData = { email: "john@example.com" };
        renderUserProfile(container, mockUserData);

        expect(container.querySelector("#user-name").textContent).toBe("Nombre no disponible");
        expect(container.querySelector("#user-email").textContent).toBe("john@example.com");
    });


    it("should toggle edit form visibility", () => {
        const mockUserData = { username: "JohnDoe", email: "john@example.com" };
        renderUserProfile(container, mockUserData);

        const editButton = container.querySelector("#edit-profile-btn");
        const editForm = container.querySelector("#edit-form");

        editButton.click();
        expect(editForm.style.display).toBe("block");

        editButton.click();
        expect(editForm.style.display).toBe("none");
    });

});
