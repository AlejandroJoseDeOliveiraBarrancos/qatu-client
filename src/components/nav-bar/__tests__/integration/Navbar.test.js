import { initializeNavbarViewModel } from '../../NavbarViewModel.js';
import { renderNavbarLinks } from '../../NavbarView.js';

describe('Navbar Integration', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should initialize and render navbar with valid links', () => {
        const links = [
            { text: 'Home', href: '/home', iconClass: 'fa-home' },
            { text: 'Profile', href: '/profile', iconClass: 'fa-user' },
            { text: 'Settings', href: '/settings', iconClass: 'fa-cog' }
        ];

        initializeNavbarViewModel(container, links, '/home');

        expect(container.querySelectorAll('.nav-item').length).toBe(3);
        expect(container.querySelector('.nav-link.active').href).toContain('/home');
    });
    
    test('should handle link click and call handler', () => {
        const mockHandler = jest.fn();
        const links = [
            { text: 'Home', href: '/home', iconClass: 'fa-home' },
            { text: 'Contact', href: '/contact', iconClass: 'fa-envelope' }
        ];

        initializeNavbarViewModel(container, links);
        renderNavbarLinks(container, links);
        
        container.addEventListener('click', event => {
            const clickedLink = event.target.closest('.nav-link');
            if (clickedLink) {
                mockHandler(clickedLink.href);
            }
        });

        const contactLink = container.querySelector('.nav-link[href="/contact"]');
        contactLink.click();

        expect(mockHandler).toHaveBeenCalledWith(expect.stringContaining('/contact'));
    });
});
