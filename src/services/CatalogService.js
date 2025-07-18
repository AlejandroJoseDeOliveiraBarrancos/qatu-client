import { createRequestManager } from "../services/RequestManager.js";

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

export async function fetchCatalogs(page = 1, pageSize = 10, filter = '', criteria = '', order = 'asc') {
  try {
    const url = `/Catalogs?page=${page}&pageSize=${pageSize}&filter=${encodeURIComponent(filter)}&criteria=${criteria}&order=${order}`;
    const data = await requestManager.get(url);
    return data;
  } catch (error) {
    console.error('Error en el servicio de catálogos:', error);
    throw error;
  }
}

export async function fetchCatalogById(id) {
  try {
    const url = `/Catalogs/${id}`;
    const data = await requestManager.get(url);
    return data;
  } catch (error) {
    console.error('Error en el servicio de catálogos:', error);
    throw error;
  }
}

export async function registerCatalog(catalogData) {
  try {
    const url = `/Catalogs`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
      },
      body: JSON.stringify(catalogData)
    };

    const response = await requestManager.post(url, options);
    return response;
  } catch (error) {
    console.error("Error al crear el catálogo:", error);
    throw error;
  }
}

export async function updateCatalogById(id, catalogData) {
  try {
    const url = `/Catalogs/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
      },
      body: JSON.stringify(catalogData)
    };

    const response = await requestManager.patch(url, options);
    return response;
  } catch (error) {
    console.error("Error al actualizar el catálogo:", error);
    throw error;
  }
}

export async function deleteCatalogById(id) {
  try {
    const url = `/Catalogs/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
      },
    };

    const response = await requestManager.delete(url, options);
    if (response.status === 204) {
      return { success: true };
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Error: ${response.status} - ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el catálogo:", error);
    throw error;
  }
}
