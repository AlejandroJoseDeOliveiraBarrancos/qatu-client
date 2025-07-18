import productView from '../views/ProductView.html';
import '../assets/styles/ProductView.css';
import initializeBanner from './BannerComponent.js';
import initializePanel from './PanelComponent.js';

export default function renderProductView() {
  const productViewElement = document.createElement('div');
  productViewElement.innerHTML = productView;

  //----------------------------------------BANNER INTEGRATION----------------------------------------
  const bannerContainer = productViewElement.querySelector("#banner-container");
  initializeBanner(bannerContainer);

  //----------------------------------------PANEL IMPLEMENTATION----------------------------------------
  const panelContainer = productViewElement.querySelector("#panel-container");
  const filterContainer = productViewElement.querySelector("#filter-container");
  initializePanel(panelContainer, filterContainer);

  //----------------------------------------PAGINATION LOGIC----------------------------------------
  const paginationContainer = productViewElement.querySelector("#pagination-container");

  return productViewElement;
};
