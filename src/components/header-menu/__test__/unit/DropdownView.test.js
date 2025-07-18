import DropdownView from '../../DropdownView.js';

describe('DropdownView', () => {
    let container;
    let iconsData;

    beforeEach(() => {
        container = document.createElement('div');
        iconsData = [
            { id: 'menu1', icon: '📁', list: '<ul><li>Item 1</li></ul>' },
            { id: 'menu2', icon: '🔧', list: '<ul><li>Item 2</li></ul>' }
        ];
    });

    test('should render icons and menus correctly', () => {
        const view = DropdownView(container, iconsData);

        expect(container.querySelectorAll('.icon-dropdown').length).toBe(iconsData.length);
        expect(container.querySelector('.icon').innerHTML).toBe('📁');
    });

    test('should toggle menu visibility', () => {
        const view = DropdownView(container, iconsData);

        view.toggleMenu('menu1', true);
        const menu = container.querySelector('.dropdown-menu');
        expect(menu.style.display).toBe('block');

        view.toggleMenu('menu1', false);
        expect(menu.style.display).toBe('none');
    });
});
