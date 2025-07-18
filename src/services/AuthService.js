export const checkAuthToken = () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken && window.location.hash !== '#/login') {
        window.location.hash = '#/login';
    }
};

export const handleHashChange = (router) => {
    const hashLocation = window.location.hash;
    router(hashLocation);
};

export const hasPermission = (routeConfig, user, role) => {
    
    if (routeConfig.requiresAuth && !user) {
        return false;
    }

    if (routeConfig.requiredRole && role !== routeConfig.requiredRole) {
        return false;
    }

    return true;
};

export function logoutUser() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("lastLoginEmail");
    localStorage.removeItem("lastLoginPassword");
    console.log("User logged out");
    window.location.hash = "#/login"; 
}
