import { createListboxModel, selectItemById, getSelectedItems } from '../../ListboxModel.js';
import { createListboxViewModel } from '../../ListboxViewModel.js';
import { renderItems, updateSelection, bindSelectItem, displaySelectedItems } from '../../ListboxView.js';

describe('ListboxViewModel', () => {
    let model, container, selectedItemsContainer, viewModel;

    beforeEach(() => {
        container = document.createElement('div');
        selectedItemsContainer = document.createElement('div');
        model = createListboxModel([{ id: '1', label: 'Item 1' }]);
        viewModel = createListboxViewModel(model, container, selectedItemsContainer, 'single');
        viewModel.initialize();
    });

    test('should initialize view with items', () => {
        expect(container.children.length).toBe(1);
        expect(container.children[0].dataset.itemId).toBe('1');
    });

    test('should handle item selection', () => {
        viewModel.initialize();
        const newModel = selectItemById(model, '1');
        expect(getSelectedItems(newModel)).toEqual([{ id: '1', label: 'Item 1' }]);
    });

    test('should update view after selection', () => {
        viewModel.initialize();
        const newModel = selectItemById(model, '1');
        const selectedItems = new Set(getSelectedItems(newModel).map(item => item.id));
        updateSelection(container, selectedItems);
        displaySelectedItems(selectedItemsContainer, selectedItems);
        expect(selectedItemsContainer.textContent).toBe('Selected Items: 1');
    });
});
