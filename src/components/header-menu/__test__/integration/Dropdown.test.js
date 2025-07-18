import DropdownModel from '../../DropdownModel.js';
import DropdownView from '../../DropdownView.js';
import DropdownViewModel from '../../DropdownViewModel.js';

describe('Dropdown Integration', () => {
    let container;
    let iconsData;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        iconsData = [
            { id: 'menu1', icon: '📁', list: '<ul><li>Item 1</li></ul>' },
            { id: 'menu2', icon: '🔧', list: '<ul><li>Item 2</li></ul>' }
        ];
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should render dropdown and toggle menu visibility on icon click', () => {
        const model = DropdownModel(iconsData);
        const view = DropdownView(container, iconsData);
        const viewModel = DropdownViewModel(model, view);

        expect(container.querySelectorAll('.icon-dropdown').length).toBe(iconsData.length);

        container.querySelectorAll('.icon')[0].click();

        const menu1 = container.querySelectorAll('.dropdown-menu')[0];
        expect(menu1.style.display).toBe('block');

        container.querySelectorAll('.icon')[0].click();
        expect(menu1.style.display).toBe('none');
    });

    test('should close all menus when clicking outside', () => {
        const model = DropdownModel(iconsData);
        const view = DropdownView(container, iconsData);
        const viewModel = DropdownViewModel(model, view);

        container.querySelectorAll('.icon')[0].click();
        const menu1 = container.querySelectorAll('.dropdown-menu')[0];
        expect(menu1.style.display).toBe('block');

        document.body.click();
        expect(menu1.style.display).toBe('none');
    });

    test('should switch between menus when different icons are clicked', () => {
        const model = DropdownModel(iconsData);
        const view = DropdownView(container, iconsData);
        const viewModel = DropdownViewModel(model, view);

        container.querySelectorAll('.icon')[0].click();
        const menu1 = container.querySelectorAll('.dropdown-menu')[0];
        expect(menu1.style.display).toBe('block');

        container.querySelectorAll('.icon')[1].click();
        const menu2 = container.querySelectorAll('.dropdown-menu')[1];
        expect(menu1.style.display).toBe('none');
        expect(menu2.style.display).toBe('block');
    });
});
