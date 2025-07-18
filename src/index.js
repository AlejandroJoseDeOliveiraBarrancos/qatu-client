import { renderPage } from './router/Router.js';
import { checkAuthToken, handleHashChange } from './services/AuthService.js';
import appState from './viewmodels/State.js';

const init = () => {
    checkAuthToken();
    const { user, role } = appState.getState();
    let hashLocation = window.location.hash || '#/login';
    renderPage(hashLocation);
    //localStorage.setItem('role', 'Admin')

    // TODO: remove when roles is done in backend
    localStorage.setItem('role', 'Admin')
    
    window.addEventListener('hashchange', () => {
        const updatedUser = appState.getState().user;
        const updatedRole = appState.getState().role;
        renderPage(window.location.hash, updatedUser, updatedRole);
    });
};

window.addEventListener('DOMContentLoaded', init);
