import authRoutes from "./AuthRoutes.js";
import menuRoutes from "./MenuRoutes.js";

const routes = {
    ...authRoutes,
    ...menuRoutes,
};

export default routes;
