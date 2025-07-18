import { createRequestManager } from "./RequestManager.js";

const requestManager = createRequestManager({ baseUrl: "http://localhost:5162/api" });

export async function fetchUsers() {
    const token = localStorage.getItem("accessToken") || "";
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return await requestManager.get("/Users", {headers});
}

export const fetchCurrentUserProfile = async () => {
    try {
        const token = localStorage.getItem("accessToken") || "";
        if (!token) throw new Error("No se encontró un token de acceso.");

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await requestManager.get("/Users/me", { headers });

        if (!response) throw new Error("Respuesta vacía del servidor.");

        return response;
    } catch (error) {
        console.error("Error en fetchCurrentUserProfile:", error);
        throw error; 
    }
};

export async function createUser(user) {
    const token = localStorage.getItem("accessToken") || "";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    return await requestManager.post("/Users", {
        headers,
        body: JSON.stringify(user),
    });
}

export async function updateUser(userId, user) {
    const token = localStorage.getItem("accessToken") || "";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    return await requestManager.patch(`/Users/${userId}`, {
        headers,
        body: JSON.stringify(user),
    });
}


export async function deleteUser(userId) {
    const token = localStorage.getItem("accessToken") || "";
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return await requestManager.delete(`/Users/${userId}`, { headers });
}