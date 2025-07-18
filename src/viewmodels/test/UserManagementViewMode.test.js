import UserManagementViewModel from "../UserManagementViewModel";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../services/UserService";

jest.mock("../../services/UserService", () => ({
    fetchUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
}));

describe("UserManagementViewModel", () => {
    let viewModel;

    beforeEach(() => {
        viewModel = new UserManagementViewModel();

        document.body.innerHTML = `
            <div>
                <button id="btn-add-user"></button>
                <input id="filter-input" />
                <table id="user-list"></table>
            </div>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it("should load users and set users and filteredUsers properties", async () => {
        const mockUsers = [
            { id: 1, username: "JohnDoe", email: "john@example.com" },
            { id: 2, username: "JaneDoe", email: "jane@example.com" },
        ];
        fetchUsers.mockResolvedValue(mockUsers);

        await viewModel.loadUsers();

        expect(fetchUsers).toHaveBeenCalledTimes(1);
        expect(viewModel.users).toEqual(mockUsers);
        expect(viewModel.filteredUsers).toEqual(mockUsers);
    });

    it("should handle error when loading users", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        fetchUsers.mockRejectedValue(new Error("Failed to fetch users"));

        await viewModel.loadUsers();

        expect(consoleErrorSpy).toHaveBeenCalledWith("Error cargando usuarios:", expect.any(Error));
        expect(viewModel.users).toEqual([]);
    });

    it("should render users correctly", () => {
        viewModel.filteredUsers = [
            { id: 1, username: "JohnDoe", email: "john@example.com" },
            { id: 2, username: "JaneDoe", email: "jane@example.com" },
        ];

        viewModel.renderUsers();

        const rows = document.querySelectorAll("#user-list tr");
        expect(rows.length).toBe(2);
        expect(rows[0].innerHTML).toContain("JohnDoe");
        expect(rows[1].innerHTML).toContain("JaneDoe");
    });

    it("should add a user and reload the list", async () => {
        createUser.mockResolvedValue({});
        fetchUsers.mockResolvedValue([
            { id: 1, username: "JohnDoe", email: "john@example.com" },
            { id: 2, username: "JaneDoe", email: "jane@example.com" },
        ]);

        jest.spyOn(window, "prompt").mockImplementation((message) => {
            if (message.includes("nombre")) return "TestUser";
            if (message.includes("email")) return "test@example.com";
            if (message.includes("password")) return "123456";
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await viewModel.addUser();

        expect(createUser).toHaveBeenCalledWith({
            userName: "TestUser",
            email: "test@example.com",
            password: "123456",
        });
        expect(fetchUsers).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Usuario agregado con éxito");
    });

    it("should edit a user and reload the list", async () => {
        const mockUser = { id: 1, name: "JohnDoe", email: "john@example.com" };
        updateUser.mockResolvedValue({});
        fetchUsers.mockResolvedValue([mockUser]);

        jest.spyOn(window, "prompt").mockImplementation((message) => {
            if (message.includes("nombre")) return "UpdatedUser";
            if (message.includes("email")) return "updated@example.com";
        });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        await viewModel.editUser(mockUser);

        expect(updateUser).toHaveBeenCalledWith(1, { name: "UpdatedUser", email: "updated@example.com" });
        expect(fetchUsers).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Usuario editado con éxito");
    });

    it("should delete a user and reload the list", async () => {
        deleteUser.mockResolvedValue({});
        fetchUsers.mockResolvedValue([]);

        jest.spyOn(window, "confirm").mockImplementation(() => true);
        jest.spyOn(window, "alert").mockImplementation(() => {});

        await viewModel.deleteUser(1);

        expect(deleteUser).toHaveBeenCalledWith(1);
        expect(fetchUsers).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Usuario eliminado con éxito");
    });

    it("should filter users by query", () => {
        viewModel.users = [
            { id: 1, username: "JohnDoe", email: "john@example.com" },
            { id: 2, username: "JaneDoe", email: "jane@example.com" },
        ];

        viewModel.filterUsers("Jane");

        expect(viewModel.filteredUsers).toEqual([{ id: 2, username: "JaneDoe", email: "jane@example.com" }]);
    });

    it("should attach events to buttons and inputs", () => {
        const addUserSpy = jest.spyOn(viewModel, "addUser").mockImplementation(() => {});
        const filterUsersSpy = jest.spyOn(viewModel, "filterUsers").mockImplementation(() => {});

        viewModel.attachEvents();

        document.getElementById("btn-add-user").click();
        expect(addUserSpy).toHaveBeenCalled();

        const filterInput = document.getElementById("filter-input");
        filterInput.value = "Jane";
        filterInput.dispatchEvent(new Event("input"));
        expect(filterUsersSpy).toHaveBeenCalledWith("Jane");
    });
});
