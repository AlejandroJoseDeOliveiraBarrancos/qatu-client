import { pages } from '../viewmodels/ManagerViewModels.js'
import { Roles } from './UserRoles.js'

const menuRoutes = {
  '#/': {
    view: pages.home,
    requiresAuth: true,
    requiredRole: Roles.ADMIN,
  },
  '#/favorites': {
    // emulate since the view isn't created yet
    view: pages.home,
    requiresAuth: true,
  },
  '#/shopped': {
    // emulate since the view isn't created yet
    view: pages.home,
    requiresAuth: false,
  },
  '#/inbox': {
    // emulate since the view isn't created yet
    view: pages.userManagement,
    requiresAuth: false,
    // requiredRole: Roles.ADMIN,
  },
  '#/support': {
    // emulate since the view isn't created yet
    view: pages.supportChat,
    requiresAuth: false,
  },
}

export default menuRoutes
