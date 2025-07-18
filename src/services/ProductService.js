import { createRequestManager } from "../services/RequestManager.js";

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

export async function fetchProducts(page = 1, pageSize = 10, filter = '', criteria = '', order = 'asc') {
  try {
      const url = `/Products?page=${page}&pageSize=${pageSize}&filter=${encodeURIComponent(filter)}&criteria=${criteria}&order=${order}`;
      const data = await requestManager.get(url);
      return data;
  } catch (error) {
      console.error('Error en el servicio de productos:', error);
      throw error;
  }
}

export async function fetchProductById(id) {
  try {
    if (id) {
      const productData = await requestManager.get(`/Products/${id}`);
      return productData;
    }
  } catch (error) {
    console.error("Error en el servicio de productos:", error);
    throw error;
  }
}

export async function registerProduct(productData) {
  try {
    const url = `/Products`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
      },
      body: JSON.stringify(productData)
    };

    const response = await requestManager.post(url, options);
    return response;
  } catch (error) {
    console.error("Error en el servicio de registro de productos:", error);
    throw error;
  }
}

export const updateProductById = async (id, productData) => {
  try {
      const response = await fetch(`http://localhost:5162/api/Products/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
          },
          body: JSON.stringify(productData),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5162/api/Products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('accessToken') || ''
      },
    });

    if (response.status === 204) {
      return { success: true };
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Error: ${response.status} - ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message || error);
    throw error;
  }
};

export async function uploadImageToImgBB(imageBase64) {
  const apiKey = "4993dc231bc010b5bee01868a799384c";
  const url = "https://api.imgbb.com/1/upload";

  try {
    const response = await fetch(`${url}?key=${apiKey}`, {
      method: "POST",
      body: new URLSearchParams({
        image: imageBase64.split(",")[1],
      }),
    });

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      throw new Error("Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error en ImgBB:", error);
    throw error;
  }
}