import { getValidLinks } from './NavbarModel.js';
import { renderNavbarLinks, updateActiveNavbarLink, bindNavbarLinkClick } from './NavbarView.js';

export const initializeNavbarViewModel = (container, links, activeLink = '') => {
    const validLinks = getValidLinks(links);
    renderNavbarLinks(container, validLinks, activeLink);
};

export const handleNavbarLinkClick = (container, activeLink) => {
    updateActiveNavbarLink(container, activeLink);
};
