import { fetchCart } from "../services/CartService.js"; 
import "../assets/styles/Cart.css"

export default class CartViewModel {
  constructor() {
    this.cartItems = [];
  }

  async loadCart() {
    try {
      const cartData = await fetchCart();
      this.cartItems = cartData || [];
      this.renderCart(document.querySelector("#cart-items"));
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  }

  async renderCart(container) {
    if (!container) {
      console.error("El contenedor #cart-items no existe en el DOM.");
      return;
    }

    container.innerHTML = "";

    this.cartItems.forEach((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "cart-card";
      cardDiv.innerHTML = `
        <div class="cart-card-content">
          <h3 class="sales-name">Sale ID: ${item.saleId}</h3>
          <p class="sales-price">Total: $${item.total}</p>
        </div>
      `;
      container.appendChild(cardDiv); // Añade la card al contenedor
    });
  }
}
