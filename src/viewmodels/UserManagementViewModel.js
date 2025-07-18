import { fetchUsers, createUser, updateUser, deleteUser } from "../services/UserService.js";

export default class UserManagementViewModel {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
    }

    async loadUsers() {
        try {
            this.users = await fetchUsers();
            this.filteredUsers = [...this.users];
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    }

    attachEvents() {
        document.getElementById("btn-add-user").addEventListener("click", () => this.addUser());
        document.getElementById("filter-input").addEventListener("input", (e) => this.filterUsers(e.target.value));
        this.renderUsers();
    }

    renderUsers() {
        const userList = document.getElementById("user-list");
        userList.innerHTML = "";

        this.filteredUsers.forEach((user) => {
            console.log(user);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td class="action-buttons">
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            `;

            row.querySelector(".btn-edit").addEventListener("click", () => this.editUser(user));
            row.querySelector(".btn-delete").addEventListener("click", () => this.deleteUser(user.id));
            userList.appendChild(row);
        });
    }

    async addUser() {
        const userName = prompt("Ingrese el nombre del usuario:");
        const email = prompt("Ingrese el email del usuario:");
        const password = prompt("Ingrese el password del usuario:");

        if (!userName || !email || !password) {
            alert("Debe proporcionar un nombre, password y un email.");
            return;
        }

        try {
            await createUser({ userName, email, password });
            alert("Usuario agregado con éxito");
            await this.loadUsers();
            const userListContainer = document.getElementById("user-list");
            this.renderUsers(userListContainer); 
        } catch (error) {
            console.error("Error agregando usuario:", error);
        }
    }

    async editUser(user) {
        const name = prompt("Editar nombre:", user.name);
        const email = prompt("Editar email:", user.email);

        try {
            await updateUser(user.id, { name, email });
            alert("Usuario editado con éxito");
            await this.loadUsers();
        } catch (error) {
            console.error("Error editando usuario:", error);
        }
    }

    async deleteUser(userId) {
        if (!confirm("¿Está seguro de que desea eliminar este usuario?")) return;

        try {
            await deleteUser(userId);
            alert("Usuario eliminado con éxito");
            await this.loadUsers();
        } catch (error) {
            console.error("Error eliminando usuario:", error);
        }
    }

    filterUsers(query) {
        this.filteredUsers = this.users.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
        );
        this.renderUsers();
    }
}
