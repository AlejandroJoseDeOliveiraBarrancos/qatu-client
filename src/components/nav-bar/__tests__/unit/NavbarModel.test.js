import { validateLink, getValidLinks, setNavbarMode } from '../../NavbarModel.js';
import { NAVBAR_MODE } from '../../constants.js';

describe('NavbarModel', () => {
    test('should validate link correctly', () => {
        const validLink = { text: 'Home', href: '/home' };
        const invalidLink = { text: 'Home' };

        expect(validateLink(validLink)).toBe(true);
        expect(validateLink(invalidLink)).toBe(false);
    });

    test('should get only valid links', () => {
        const links = [
            { text: 'Home', href: '/home' },
            { text: 'Invalid' }
        ];
        const validLinks = getValidLinks(links);

        expect(validLinks).toEqual([{ text: 'Home', href: '/home' }]);
    });

    test('should set valid navbar mode', () => {
        expect(setNavbarMode(NAVBAR_MODE.DYNAMIC)).toBe(NAVBAR_MODE.DYNAMIC);
        expect(setNavbarMode('INVALID_MODE')).toBe(NAVBAR_MODE.STATIC);
    });
});
