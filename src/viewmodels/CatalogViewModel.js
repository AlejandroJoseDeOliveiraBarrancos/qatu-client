import catalog from '../views/catalog/CatalogView.html';
import '../assets/styles/Catalog.css';

import { fetchCatalogById } from '../services/CatalogService.js';

export default async function CatalogViewModel(catalogId) {
  const catalogViewElement = document.createElement('div');
  catalogViewElement.innerHTML = catalog;

  const backButton = catalogViewElement.querySelector(".back-button");

  backButton.addEventListener("click", () => {
    window.location.hash = "#/catalog-list";
  });

  try {
    const catalogData = await fetchCatalogById(catalogId);

    const bannerElement = catalogViewElement.querySelector('#catalog-banner');
    if (bannerElement) {
      bannerElement.querySelector('.catalog-name-only').textContent = catalogData.name;
      bannerElement.querySelector('.catalog-description-by-id').textContent =
        catalogData.description;
    } else {
      console.error('Catalog banner element not found.');
    }

    // Populate product list
    const productsContainer = catalogViewElement.querySelector('#catalog-products');
    if (productsContainer) {
      catalogData.products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card-by-id';

        productElement.innerHTML = `
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-status">${product.status}</p>
        `;
        productsContainer.appendChild(productElement);
      });
    } else {
      console.error('Products container not found.');
    }
  } catch (error) {
    console.error('Error loading catalog data:', error);
  }

  return catalogViewElement;
}
