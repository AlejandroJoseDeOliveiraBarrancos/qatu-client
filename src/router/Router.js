import routes from "./RouteManager.js";
import { hasPermission } from "../services/AuthService.js";
import { pages } from "../viewmodels/ManagerViewModels.js";

const handleDynamicRoutes = async (route, app) => {
    const dynamicRoutes = [
        {
            regex: /^#\/edit-product\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = pages.editProduct(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/product-view\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = await pages.product(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/delete-product\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = await pages.deleteProduct(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/edit-catalog\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = await pages.editCatalog(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/delete-catalog\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = await pages.deleteCatalog(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/catalog-view\/([a-zA-Z0-9-]+)$/,
            handler: async (id) => {
                const view = await pages.catalog(id);
                app.appendChild(view);
            },
        },
        {
            regex: /^#\/catalog-list$/,
            handler: async () => {
                const view = await pages.catalogList();
                app.appendChild(view);
            },
        },
    ];
    for (const routeConfig of dynamicRoutes) {
        const match = route.match(routeConfig.regex);
        if (match) {
            const id = match[1];
            await routeConfig.handler(id);
            return true;
        }
    }

    return false;
};

const renderStaticRoute = async (route, app, outside) => {
    const routeConfig = routes[route];
    if (!routeConfig) {
        app.innerHTML = "<h1>404 - Page Not Found</h1>";
        return;
    }

    if (!hasPermission(routeConfig)) {
        app.appendChild(routes["#/unauthorized"].view());
        return;
    }

    // render view
    if (routeConfig.requiresAuth) {
        app.appendChild(routeConfig.view());
    } else {
        outside.appendChild(routeConfig.view());
    }
};

const renderPage = async (route, user, role) => {
    const outside = document.getElementById("outside");
    const app = document.getElementById("app");

    outside.innerHTML = "";
    app.innerHTML = "";

    try {
        if (route === "#/user-profile") {
            const userProfileView = await pages.userProfile(app);
            if (userProfileView) {
                app.appendChild(userProfileView);
            }
            return;
        }

        const isDynamicRouteHandled = await handleDynamicRoutes(route, app);
        if (!isDynamicRouteHandled) {
            await renderStaticRoute(route, app, outside);
        }
    } catch (error) {
        console.error("Error al renderizar la ruta:", error);
        app.innerHTML = "<p>Error al cargar la vista solicitada.</p>";
    }
};

const navigate = (route) => {
    window.location.hash = route;
};

export { renderPage, navigate };