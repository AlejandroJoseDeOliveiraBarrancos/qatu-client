import { fetchProductById, deleteProductById } from "../services/ProductService.js";
import deleteProductTemplate from "../views/DeleteProduct.html";
import "../assets/styles/DeleteProduct.css";

export default async function deleteProductViewModel(productId) {
    const container = document.createElement("div");
    container.innerHTML = deleteProductTemplate;

    try {
        const productData = await fetchProductById(productId);
        const productTitleElement = container.querySelector("#delete-product-title");

        if (productData && productData.name) {
            productTitleElement.textContent = `${productData.name}`;
        } else {
            productTitleElement.textContent = "Producto no encontrado.";
        }

        const confirmButton = container.querySelector("#confirm-delete-btn");
        confirmButton.addEventListener("click", async () => {
      try {
        const result = await deleteProductById(productId);
        if (result.success) {
          alert("Producto eliminado exitosamente.");
          window.location.hash = "#/market-view"; 
        } else {
          alert("Error inesperado al eliminar el producto.");
        }
      } catch (error) {
        console.error("Error en confirmación de eliminación:", error.message || error);
        alert("El producto no existe o ya fue eliminado.");
        window.location.hash = "#/market-view"; 
            }
        });

        const cancelButton = container.querySelector("#cancel-delete-btn");
        cancelButton.addEventListener("click", () => {
            window.location.hash = `#/product-view/${productId}`;
        });
    } catch (error) {
        console.error("Error en DeleteProductViewModel:", error);
        container.innerHTML = "<h1>Error al cargar la vista de eliminación de producto.</h1>";
    }

    return container;
}
