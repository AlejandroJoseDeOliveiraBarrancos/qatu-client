import DropdownModel from '../../DropdownModel.js';
import DropdownView from '../../DropdownView.js';
import DropdownViewModel from '../../DropdownViewModel.js';

describe('DropdownViewModel', () => {
    let model;
    let view;
    let container;
    let iconsData;

    beforeEach(() => {
        container = document.createElement('div');
        iconsData = [
            { id: 'menu1', icon: '📁', list: '<ul><li>Item 1</li></ul>' },
            { id: 'menu2', icon: '🔧', list: '<ul><li>Item 2</li></ul>' }
        ];

        model = DropdownModel(iconsData);
        view = DropdownView(container, iconsData);
        jest.spyOn(view, 'toggleMenu');
        DropdownViewModel(model, view);
    });

    test('should handle menu toggle correctly', () => {
        container.querySelectorAll('.icon')[0].click();

        expect(view.toggleMenu).toHaveBeenCalledWith('menu1', true);

        container.querySelectorAll('.icon')[0].click();
        expect(view.toggleMenu).toHaveBeenCalledWith('menu1', false);
    });
});
