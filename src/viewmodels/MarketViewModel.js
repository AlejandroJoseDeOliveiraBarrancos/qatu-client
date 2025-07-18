import market from '../views/Market.html'
import '../assets/styles/Market.css'
// --------------------------------------CART------------------------------------
import createProductView from './Cart.js';
import CartViewModel from '../viewmodels/CartViewModel.js';
//----------------------------------------NAVBAR----------------------------------------
import {
  initializeNavbarViewModel,
  handleNavbarLinkClick,
} from '../components/nav-bar/NavbarViewModel.js'
import { bindNavbarLinkClick } from '../components/nav-bar/NavbarView.js'
import '../components/nav-bar/NavBarStyles.css'
//----------------------------------------DROPDOWN AND SEARCH----------------------------------------
import DropdownModel from '../components/header-menu/DropdownModel.js'
import DropdownView from '../components/header-menu/DropdownView.js'
import { logoutUser } from "../services/AuthService.js";import DropdownViewModel from '../components/header-menu/DropdownViewModel.js'
import '../components/header-menu/DropDownMenu.css'

import SearchBarView from '../components/searchbar/SearchBarView.js'
import SearchBarViewModel from '../components/searchbar/SearchBarViewModel.js'
import SearchBarModel from '../components/searchbar/SearchBarModel.js'
import '../components/searchbar/SearchBar.css'
//----------------------------------------FOOTER----------------------------------------
import { createFooterModel } from '../components/footer/FooterModel.js'
import { createFooterView } from '../components/footer/FooterView.js'
import { createFooterViewModel } from '../components/footer/FooterViewModel.js'
import '../components/footer/Footer.css'

//-----------------------------------PRODUT VIEW
import renderProductView from './ProductHomeViewModel.js';

//----------------------------------------REGISTER PRODUCT----------------------------------------
import { integrateRegisterProduct } from '../viewmodels/ProductRegisterViewModel.js'
import SupportChat from './SupportChat.js'
import UserManagement from './UserManagement.js'

export default () => {
  const marketViewElement = document.createElement('div')
  marketViewElement.innerHTML = market

  //----------------------------------------NAVBAR INTEGRATION----------------------------------------
  const navLinks = [
    { text: 'Home', href: '#/market-view', iconClass: 'fa-home' },
    { text: 'Catalogs', href: '#/catalog-list', iconClass: 'fa-star' },
    { text: 'Shopped', href: '#/market-view/test3', iconClass: 'fa-shopping-cart' },
    { text: 'Users', href: '#/market-view/test2', iconClass: 'fa-users' },
    { text: 'Support', href: '#/market-view/test', iconClass: 'fa-headphones' },
  ]

  const navbarContainer = marketViewElement.querySelector('#navbar-vertical')
  if (navbarContainer) {
    initializeNavbarViewModel(navbarContainer, navLinks)
    bindNavbarLinkClick(navbarContainer, (href) =>
      handleNavbarLinkClick(navbarContainer, href),
    )
  } else {
    console.error('Navbar container not found in DOM.')
  }

  //----------------------------------------DROPDOWN INTEGRATION----------------------------------------
  const icons = [
    {
      id: 'notifications',
      icon:
        '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M17.1625 26.25C16.9427 26.6288 16.6273 26.9433 16.2478 27.1619C15.8683 27.3805 15.438 27.4956 15 27.4956C14.562 27.4956 14.1317 27.3805 13.7522 27.1619C13.3727 26.9433 13.0573 26.6288 12.8375 26.25M22.5 10C22.5 8.01088 21.7098 6.10322 20.3033 4.6967C18.8968 3.29018 16.9891 2.5 15 2.5C13.0109 2.5 11.1032 3.29018 9.6967 4.6967C8.29018 6.10322 7.5 8.01088 7.5 10C7.5 18.75 3.75 21.25 3.75 21.25H26.25C26.25 21.25 22.5 18.75 22.5 10Z" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      label: 'Notifications',
      list: `
                <ul class="notifications-list">
                    <li class="list-item">Notification 1</li>
                    <li class="list-item">Notification 2</li>
                    <li class="list-item">Notification 3</li>
                </ul>`,
    },
    {
      id: 'user',
      icon: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M25 26.25V23.75C25 22.4239 24.4732 21.1521 23.5355 20.2145C22.5979 19.2768 21.3261 18.75 20 18.75H10C8.67392 18.75 7.40215 19.2768 6.46447 20.2145C5.52678 21.1521 5 22.4239 5 23.75V26.25M20 8.75C20 11.5114 17.7614 13.75 15 13.75C12.2386 13.75 10 11.5114 10 8.75C10 5.98858 12.2386 3.75 15 3.75C17.7614 3.75 20 5.98858 20 8.75Z" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      label: 'User',
      list: `
          <ul class="user-list">
              <li class="list-item" id="profile-link"><p>Profile</p></li>
              <li class="list-item" id="logout-link"><p>Log out</p></li>
          </ul>`
  }
];
  const iconContainer = marketViewElement.querySelector('.icon-container')
  const dropdownModel = DropdownModel(icons)
  if (iconContainer) {
    const dropdownView = DropdownView(iconContainer, icons)
    DropdownViewModel(dropdownModel, dropdownView)
    setTimeout(() => {
      const profileLink = document.querySelector("#profile-link");
      const logoutLink = document.querySelector("#logout-link");

      if (profileLink) {
          profileLink.addEventListener("click", () => {
              console.log("Navigating to user profile...");
              window.location.hash = "#/user-profile";
          });
      } else {
          console.error("Profile link not found in the DOM");
      }

      if (logoutLink) {
          logoutLink.addEventListener("click", () => {
              console.log("Log out clicked");
              logoutUser();
          });
      } else {
          console.error("Logout link not found in the DOM");
      }
  }, 0); 
  }

  const searchContainer = marketViewElement.querySelector('#search-container')
  const searchItems = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'Java',
    'Sveltekit',
  ]
  const searchModel = SearchBarModel(searchItems)
  const searchView = SearchBarView(searchContainer)
  const searchViewModel = SearchBarViewModel(searchModel, searchView)
  searchViewModel.initialize()

  //----------------------------------------REGISTER PRODUCT INTEGRATION----------------------------------------
  integrateRegisterProduct(marketViewElement)


  //----------------------------------------FOOTER IMPLEMENTATION----------------------------------------
  const footerLinks = [
    {
      title: 'Contactanos',
      links: [
        { name: 'X', url: '#' },
        { name: 'Instagram', url: '#' },
        { name: 'YouTube', url: '#' },
        { name: 'LinkedIn', url: '#' },
      ],
    },
    { title: 'Necesitas Ayuda?', links: [] },
    { title: 'Quieres ser parte de QATU?', links: [] },
  ]

  const footerContainer = marketViewElement.querySelector('#footerContainer')
  const footerModel = createFooterModel(footerLinks)
  if (footerContainer) {
    const footerView = createFooterView(footerContainer)
    const footerViewModel = createFooterViewModel(footerModel, footerView)
    footerViewModel.initialize()
  } else {
    console.error('Footer container not found in DOM.')
  }

  //------------------------------------ROUTER------------------------------------------------------
  const routes = {
    '/market-view/test': () => {
      const container = document.createElement('div');
      container.appendChild(SupportChat());
      return container;
    },
    '/market-view/test2': () => {
      const container = document.createElement('div');
      container.appendChild(UserManagement());
      return container;
    },
    '/market-view/test3': () => {
      const container = document.createElement("div");
      const cartViewModel = new CartViewModel();
      cartViewModel.loadCart();
      container.innerHTML = `
        <div id="cart-container">
          <h2>Ventas Realizadas</h2>
          <div id="cart-items" class="cart-items-container"></div>
        </div>
      `;
      return container;
    },
    '/market-view': renderProductView, 
  };

  const productViewContainer = marketViewElement.querySelector('#product-view-container');

  function handleRouteChange() {
    const path = location.hash.replace('#', '').trim();
    console.log(`Current path: ${path}`);
    const routeView = routes[path];

    if (productViewContainer) {
      productViewContainer.innerHTML = '';
      if (routeView) {
        const viewElement = routeView();
        productViewContainer.appendChild(viewElement);
      } else {
        productViewContainer.innerHTML = '<h2>Ruta no encontrada</h2>';
      }
    } else {
      console.error('Product view container not found in DOM.');
    }
  }

  window.addEventListener('hashchange', handleRouteChange); 
  handleRouteChange(); 

  return marketViewElement
}
