import { fetchProductById } from "../services/ProductService.js";
import { addToCart } from "../services/CartService.js"; // Nueva función para manejar el carrito
import productTemplate from "../views/Product.html";
import "../assets/styles/Product.css";

export default async function createProductView(id) {
  const productViewElement = document.createElement("div");
  productViewElement.innerHTML = productTemplate;

  try {
    const productData = await loadProductData(id);
    if (productData) {
      renderProductDetails(productViewElement, productData);
      configureProductActions(productViewElement, productData);
    } else {
      productViewElement.innerHTML = "<h1>Producto no encontrados.</h1>";
    }
  } catch (error) {
    productViewElement.innerHTML = "<h1>Failed to load product data.</h1>";
  }

  // setupBackButton(productViewElement);

  return productViewElement;
}

const loadProductData = async (id) => {
  try {
    const productData = await fetchProductById(id);
    return productData; // Obtenemos el objeto del producto
  } catch (error) {
    console.error("Error loading product:", error);
    return null;
  }
};

function renderProductDetails(container, product) {
  const titleElement = container.querySelector("#product-title");
  const descriptionElement = container.querySelector("#product-description");
  const priceElement = container.querySelector("#product-price");
  const imageElement = container.querySelector("#product-image");

  if (titleElement) titleElement.textContent = product.title;
  if (descriptionElement) descriptionElement.textContent = product.description;
  if (priceElement) priceElement.textContent = `Price: ${product.price}`;
  if (imageElement) imageElement.src = product.image || "https://via.placeholder.com/150";
}

export function configureProductActions(container, product) {
  const addToCartButton = container.querySelector("#add-to-cart-btn");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", async () => {
      try {
        await addToCart(product.id, 1); // Añade una unidad del producto actual al carrito
        alert(`El producto "${product.title}" fue añadido al carrito.`);
      } catch (error) {
        alert("Error al añadir el producto al carrito.");
      }
    });
  } else {
    console.error("El botón ADD TO CART no se encontró en el DOM.");
  }
}

function setupBackButton(container) {
  const backButton = container.querySelector("#back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.hash = "#/market-view"; // Navega de regreso al mercado
    });
  } else {
    console.error("No se encontró el botón de regreso en el DOM.");
  }
}
