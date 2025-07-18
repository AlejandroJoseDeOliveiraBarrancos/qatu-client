import { NAVBAR_MODE } from './constants.js';

export const validateLink = (link) => link && typeof link.text === 'string' && typeof link.href === 'string';

export const getValidLinks = (links = []) => links.filter(validateLink);

export const setNavbarMode = (mode, currentMode = NAVBAR_MODE.STATIC) => 
    (mode === NAVBAR_MODE.STATIC || mode === NAVBAR_MODE.DYNAMIC) ? mode : currentMode;
