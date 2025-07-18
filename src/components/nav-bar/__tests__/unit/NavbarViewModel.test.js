import { initializeNavbarViewModel, handleNavbarLinkClick } from '../../NavbarViewModel.js';
import { getValidLinks } from '../../NavbarModel.js';
import { renderNavbarLinks, updateActiveNavbarLink } from '../../NavbarView.js';

jest.mock('../../NavbarModel.js', () => ({
    getValidLinks: jest.fn(() => [{ text: 'Home', href: '/home' }])
}));

jest.mock('../../NavbarView.js', () => ({
    renderNavbarLinks: jest.fn(),
    updateActiveNavbarLink: jest.fn()
}));

describe('NavbarViewModel', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    test('should initialize view model with valid links', () => {
        initializeNavbarViewModel(container, [{ text: 'Home', href: '/home' }, { text: 'Invalid' }]);
        expect(getValidLinks).toHaveBeenCalledWith([{ text: 'Home', href: '/home' }, { text: 'Invalid' }]);
        expect(renderNavbarLinks).toHaveBeenCalledWith(container, [{ text: 'Home', href: '/home' }], '');
    });

    test('should handle active link click', () => {
        handleNavbarLinkClick(container, '/home');
        expect(updateActiveNavbarLink).toHaveBeenCalledWith(container, '/home');
    });
});
