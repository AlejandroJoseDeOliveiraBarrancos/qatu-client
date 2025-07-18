import { pages } from "../viewmodels/ManagerViewModels.js";
import { Roles } from "./UserRoles.js";  

const routes = {
    "#/": {
        view: pages.home,
        requiresAuth: true,
        requiredRole: Roles.ADMIN,  
    },
    "#/signup": {
        view: pages.signup,
        requiresAuth: false,
    },
    "#/login": {
        view: pages.login,
        requiresAuth: false,
    },
    "#/otp_validation": {
        view: pages.otpValidation,
        requiresAuth: false,
    },
    "#/forgot_password": {
        view: pages.forgotPassword,
        requiresAuth: false,
    },
    "#/reset_password": {
        view: pages.resetPassword,
        requiresAuth: false,
    },
    "#/market-view/test": {
        view: pages.market,
        requiresAuth: false,
    },
    "#/market-view/test2": {
        view: pages.market,
        requiresAuth: false,
    },
    "#/market-view/test3": {
        view: pages.market,
        requiresAuth: false,
    },
    "#/market-view": {
        view: pages.market,
        requiresAuth: false,
    },
    "#/edit-product/:id": {
        view: pages.editProduct,
        requiresAuth: true,
        requiredRole: Roles.ADMIN,
    },
    "#/delete-product/:id": {
        view: pages.deleteProduct,
        requiresAuth: true,
        requiredRole: Roles.ADMIN,
    },
    "#/user-profile": {
    view: pages.userProfile, 
    requiresAuth: false,
    },
    "#/unauthorized": {
        view: () => {
            const container = document.createElement("div");
            container.innerHTML = "<h1>No tienes autorización para entrar a esta página.</h1>";
            return container;
        },
        requiresAuth: false,
    },
};

export default routes;
