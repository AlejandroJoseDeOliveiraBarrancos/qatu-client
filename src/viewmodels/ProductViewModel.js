import { fetchProductById } from "../services/ProductService.js";
import { logoutUser } from "../services/AuthService.js";
import { ProductModel } from "../models/ProductModel.js";
import productTemplate from "../views/Product.html";
import "../assets/styles/Product.css";

// Navbar Imports
import {
    initializeNavbarViewModel,
    handleNavbarLinkClick,
} from "../components/nav-bar/NavbarViewModel.js";
import { bindNavbarLinkClick } from "../components/nav-bar/NavbarView.js";
import "../components/nav-bar/NavBarStyles.css";

import { addToCart } from "../services/CartService.js"; // Servicio para añadir al carrito


// Dropdown Imports
import DropdownModel from "../components/header-menu/DropdownModel.js";
import DropdownView from "../components/header-menu/DropdownView.js";
import DropdownViewModel from "../components/header-menu/DropdownViewModel.js";
import "../components/header-menu/DropDownMenu.css";

// Search Bar Imports
import SearchBarView from "../components/searchbar/SearchBarView.js";
import SearchBarViewModel from "../components/searchbar/SearchBarViewModel.js";
import SearchBarModel from "../components/searchbar/SearchBarModel.js";
import "../components/searchbar/SearchBar.css";

// Footer Imports
import { createFooterModel } from "../components/footer/FooterModel.js";
import { createFooterView } from "../components/footer/FooterView.js";
import { createFooterViewModel } from "../components/footer/FooterViewModel.js";
import "../components/footer/Footer.css";

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

    setupBackButton(productViewElement);

    integrateNavbar(productViewElement);

    integrateDropdown(productViewElement);

    integrateSearchBar(productViewElement);

    integrateFooter(productViewElement);

    return productViewElement; 
}

const loadProductData = async (id) => {
    try {
        const productData = await fetchProductById(id);
        return new ProductModel(productData);
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
    const editButton = container.querySelector("#edit-product-btn");
    const deleteButton = container.querySelector("#delete-product-btn");

    // Configurar el botón "ADD TO CART"
    if (addToCartButton) {
        addToCartButton.addEventListener("click", async () => {
            try {
                await addToCart(product.id, 1); // Agregar 1 unidad del producto al carrito
                alert(`El producto "${product.title}" fue añadido al carrito.`);
            } catch (error) {
                alert("Error al añadir el producto al carrito.");
                console.error("Error al añadir al carrito:", error);
            }
        });
    } else {
        console.error("El botón ADD TO CART no se encontró en el DOM.");
    }

    // Configurar los botones "EDIT" y "DELETE" para roles específicos
    const currentRole = localStorage.getItem("role");

    if (currentRole === "Admin" || currentRole === "Seller") {
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";

        if (product && product.id) {
            editButton.addEventListener("click", () => {
                window.location.hash = `#/edit-product/${product.id}`;
            });

            deleteButton.addEventListener("click", () => {
                window.location.hash = `#/delete-product/${product.id}`;
            });
        } else {
            console.error("No se encontró el ID del producto:", product);
        }
    } else {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    }
}


function setupBackButton(container) {
    const backButton = container.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.hash = "#/market-view"; 
        });
    } else {
        console.error("No se encontró el botón de regreso en el DOM.");
    }
}

function integrateNavbar(container) {
    const navLinks = [
        { text: 'Home', href: '#/market-view', iconClass: 'fa-home' },
        { text: 'Catalogs', href: '#/catalog-list', iconClass: 'fa-star' },
        { text: 'Shopped', href: '#/market-view/test3', iconClass: 'fa-shopping-cart' },
        { text: 'Users', href: '#/market-view/test2', iconClass: 'fa-users' },
        { text: 'Support', href: '#/market-view/test', iconClass: 'fa-headphones' },
      ]
    const navbarContainer = container.querySelector("#navbar-vertical");
    if (navbarContainer) {
        initializeNavbarViewModel(navbarContainer, navLinks);
        bindNavbarLinkClick(navbarContainer, (href) => handleNavbarLinkClick(navbarContainer, href));
    } else {
        console.error("Navbar container not found in DOM.");
    }
}

function integrateDropdown(container) {
    const icons = [
        {
            id: 'notifications',
            icon: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M17.1625 26.25C16.9427 26.6288 16.6273 26.9433 16.2478 27.1619C15.8683 27.3805 15.438 27.4956 15 27.4956C14.562 27.4956 14.1317 27.3805 13.7522 27.1619C13.3727 26.9433 13.0573 26.6288 12.8375 26.25M22.5 10C22.5 8.01088 21.7098 6.10322 20.3033 4.6967C18.8968 3.29018 16.9891 2.5 15 2.5C13.0109 2.5 11.1032 3.29018 9.6967 4.6967C8.29018 6.10322 7.5 8.01088 7.5 10C7.5 18.75 3.75 21.25 3.75 21.25H26.25C26.25 21.25 22.5 18.75 22.5 10Z" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            label: 'Notifications',
            list: `
                <ul class="notifications-list">
                    <li class="list-item">
                        <div class="list-item-avatar">A</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Notification 1</span>
                            <span class="list-item-desc">This is the description for notification 1.</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-avatar">B</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Notification 2</span>
                            <span class="list-item-desc">This is the description for notification 2.</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-avatar">C</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Notification 3</span>
                            <span class="list-item-desc">This is the description for notification 3.</span>
                        </div>
                    </li>
                </ul>`
        },
        {
            id: 'inbox',
            icon: '<svg width="30" height="31" viewBox="0 0 30 31" fill="none"><path d="M27.5 15.5001H20L17.5 19.3751H12.5L10 15.5001H2.5M27.5 15.5001V23.2501C27.5 23.9352 27.2366 24.5923 26.7678 25.0768C26.2989 25.5612 25.663 25.8334 25 25.8334H5C4.33696 25.8334 3.70107 25.5612 3.23223 25.0768C2.76339 24.5923 2.5 23.9352 2.5 23.2501V15.5001M27.5 15.5001L23.1875 6.6005C22.9805 6.1701 22.6615 5.80789 22.2662 5.55461C21.8709 5.30132 21.4151 5.167 20.95 5.16675H9.05C8.58489 5.167 8.12908 5.30132 7.73381 5.55461C7.33853 5.80789 7.01947 6.1701 6.8125 6.6005L2.5 15.5001" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            label: 'Inbox',
            list: `
                <ul class="inbox-list">
                    <li class="list-item">
                        <div class="list-item-avatar">D</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Inbox Item 1</span>
                            <span class="list-item-desc">Description for inbox item 1.</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-avatar">E</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Inbox Item 2</span>
                            <span class="list-item-desc">Description for inbox item 2.</span>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="list-item-avatar">F</div>
                        <div class="list-item-content">
                            <span class="list-item-title">Inbox Item 3</span>
                            <span class="list-item-desc">Description for inbox item 3.</span>
                        </div>
                    </li>
                </ul>`
        },
        {
            id: 'cart',
            icon: '<svg width="30" height="31" viewBox="0 0 30 31" fill="none"><path d="M1.25 1.29175H6.25L9.6 18.5872C9.71431 19.1818 10.0274 19.716 10.4844 20.0962C10.9415 20.4764 11.5134 20.6784 12.1 20.6667H24.25C24.8366 20.6784 25.4085 20.4764 25.8656 20.0962C26.3226 19.716 26.6357 19.1818 26.75 18.5872L28.75 7.75008H7.5M12.5 27.1251C12.5 27.8384 11.9404 28.4167 11.25 28.4167C10.5596 28.4167 10 27.8384 10 27.1251C10 26.4117 10.5596 25.8334 11.25 25.8334C11.9404 25.8334 12.5 26.4117 12.5 27.1251ZM26.25 27.1251C26.25 27.8384 25.6904 28.4167 25 28.4167C24.3096 28.4167 23.75 27.8384 23.75 27.1251C23.75 26.4117 24.3096 25.8334 25 25.8334C25.6904 25.8334 26.25 26.4117 26.25 27.1251Z" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            label: 'Cart',
            list: `
                <ul class="cart-list">
                    <li class="list-item">
                        <input type="checkbox" id="cart-item1">
                        <label for="cart-item1">Cart item 1</label>
                    </li>
                    <li class="list-item">
                        <input type="checkbox" id="cart-item2">
                        <label for="cart-item2">Cart item 2</label>
                    </li>
                    <li class="list-item">
                        <input type="checkbox" id="cart-item3">
                        <label for="cart-item3">Cart item 3</label>
                    </li>
                </ul>`
        },
        {
            id: 'favorites',
            icon: '<svg width="30" height="31" viewBox="0 0 30 31" fill="none"><path d="M26.05 5.9545C25.4116 5.29446 24.6535 4.77088 23.8192 4.41365C22.9849 4.05642 22.0906 3.87256 21.1875 3.87256C20.2844 3.87256 19.3902 4.05642 18.5558 4.41365C17.7215 4.77088 16.9635 5.29446 16.325 5.9545L15 7.32367L13.675 5.9545C12.3854 4.6219 10.6363 3.87325 8.81253 3.87325C6.98874 3.87325 5.23964 4.6219 3.95003 5.9545C2.66041 7.2871 1.93591 9.0945 1.93591 10.9791C1.93591 12.8637 2.66041 14.6711 3.95003 16.0037L15 27.422L26.05 16.0037C26.6888 15.3439 27.1955 14.5606 27.5412 13.6985C27.8869 12.8364 28.0648 11.9123 28.0648 10.9791C28.0648 10.0459 27.8869 9.1218 27.5412 8.25967C27.1955 7.39753 26.6888 6.61423 26.05 5.9545Z" stroke="#346625" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            label: 'Favorites',
            list: `
                <ul class="favorites-list">
                    <li class="list-item">
                        <input type="checkbox" id="fav-item1">
                        <label for="fav-item1">Favorite item 1</label>
                    </li>
                    <li class="list-item">
                        <input type="checkbox" id="fav-item2">
                        <label for="fav-item2">Favorite item 2</label>
                    </li>
                    <li class="list-item">
                        <input type="checkbox" id="fav-item3">
                        <label for="fav-item3">Favorite item 3</label>
                    </li>
                </ul>`
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
    const iconContainer = container.querySelector(".icon-container");
    const dropdownModel = DropdownModel(icons);
    if (iconContainer) {
        const dropdownView = DropdownView(iconContainer, icons);
        DropdownViewModel(dropdownModel, dropdownView);
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
}

function integrateSearchBar(container) {
    const searchContainer = container.querySelector("#search-container");
    const searchItems = ["HTML", "CSS", "JavaScript", "React", "Node.js"];
    const searchModel = SearchBarModel(searchItems);
    const searchView = SearchBarView(searchContainer);
    const searchViewModel = SearchBarViewModel(searchModel, searchView);
    searchViewModel.initialize();
}

function integrateFooter(container) {
    const footerLinks = [
        {
          title: "Contactanos",
          links: [
            { name: "X", url: "#" },
            { name: "Instagram", url: "#" },
            { name: "YouTube", url: "#" },
            { name: "LinkedIn", url: "#" },
          ],
        },
        { title: "Necesitas Ayuda?", links: [] },
        { title: "Quieres ser parte de QATU?", links: [] },
      ];
    const footerContainer = container.querySelector("#footerContainer");
    const footerModel = createFooterModel(footerLinks);
    if (footerContainer) {
        const footerView = createFooterView(footerContainer);
        const footerViewModel = createFooterViewModel(footerModel, footerView);
        footerViewModel.initialize();
    } else {
        console.error("Footer container not found in DOM.");
    }
}
