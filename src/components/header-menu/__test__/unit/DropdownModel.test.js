import DropdownModel from '../../DropdownModel.js';

describe('DropdownModel', () => {
    let model;
    let icons;

    beforeEach(() => {
        icons = [
            { id: 'menu1', icon: '📁', list: '<ul><li>Item 1</li></ul>' },
            { id: 'menu2', icon: '🔧', list: '<ul><li>Item 2</li></ul>' }
        ];
        model = DropdownModel(icons);
    });

    test('should initialize with provided icons', () => {
        expect(model.getIcons()).toEqual(icons);
    });

    test('should set and get the open menu correctly', () => {
        expect(model.getOpenMenu()).toBeNull();
        model.setOpenMenu('menu1');
        expect(model.getOpenMenu()).toBe('menu1');
        model.setOpenMenu('menu1');
        expect(model.getOpenMenu()).toBeNull();
    });
});
