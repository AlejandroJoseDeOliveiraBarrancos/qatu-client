import { createRequestManager } from "../services/RequestManager.js";

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

export async function addToCart(productId, quantity) {
  try {
    const url = "/Sales";
    const body = {
      kart: [
        {
          productId,
          quantity,
        },
      ],
    };

    const response = await requestManager.post(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken") || "",
      },
      body: JSON.stringify(body),
    });

    return await response;
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    throw error;
  }
}

export async function fetchCart() {
  const token = localStorage.getItem("accessToken") || "";
  const headers = {
      Authorization: `Bearer ${token}`,
  };
  return await requestManager.get("/Sales", {headers});
}
