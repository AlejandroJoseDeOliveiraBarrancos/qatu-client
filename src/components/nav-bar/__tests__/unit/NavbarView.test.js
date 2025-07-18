import { initializeNavbarView, renderNavbarLinks, updateActiveNavbarLink, bindNavbarLinkClick } from '../../NavbarView.js';
import { DOM_ATTRIBUTES } from '../../constants.js';

describe('NavbarView', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    test('should initialize navbar view correctly', () => {
        initializeNavbarView(container);
        expect(container.classList.contains('nav-bar')).toBe(true);
        expect(container.getAttribute(DOM_ATTRIBUTES.ROLE)).toBe('navigation');
    });

    test('should render navbar links correctly', () => {
        const links = [
            { text: 'Home', href: '/home', iconClass: 'fa-home' },
            { text: 'Profile', href: '/profile', iconClass: 'fa-user' }
        ];
        renderNavbarLinks(container, links, '/home');

        expect(container.querySelectorAll('.nav-item').length).toBe(2);
        expect(container.querySelector('.nav-link.active').href).toContain('/home');
    });
    
    test('should handle link click event', () => {
        const mockHandler = jest.fn();
        bindNavbarLinkClick(container, mockHandler);

        const linkEl = document.createElement('a');
        linkEl.classList.add('nav-link');
        linkEl.href = '/test';
        container.appendChild(linkEl);

        linkEl.click();
        expect(mockHandler).toHaveBeenCalledWith(`${window.location.origin}/test`);

    });
});
