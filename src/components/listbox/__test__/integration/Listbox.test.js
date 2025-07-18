import { SELECTION_MODE } from '../../constans.js';
import { createListboxModel, setItems, selectItemById, toggleSelectItemById, getItems, getSelectedItems, clearSelection } from '../../ListboxModel.js';
import { initializeListboxView, renderItems, updateSelection, bindSelectItem, displaySelectedItems } from '../../ListboxView.js';
import { createListboxViewModel } from '../../ListboxViewModel.js';

describe('Listbox Integration Tests', () => {
    let model, container, selectedItemsContainer, viewModel;

    beforeEach(() => {
        container = document.createElement('div');
        selectedItemsContainer = document.createElement('div');
        document.body.appendChild(container);
        document.body.appendChild(selectedItemsContainer);

        model = createListboxModel([
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' }
        ], SELECTION_MODE.SINGLE);

        viewModel = createListboxViewModel(model, container, selectedItemsContainer, 'single');
    });

    afterEach(() => {
        container.remove();
        selectedItemsContainer.remove();
    });

    test('should initialize with items', () => {
        viewModel.initialize();
        expect(container.children.length).toBe(3);
        expect(container.children[0].dataset.itemId).toBe('1');
        expect(container.children[1].dataset.itemId).toBe('2');
        expect(container.children[2].dataset.itemId).toBe('3');
    });

    test('should select a single item in SINGLE selection mode', () => {
        viewModel.initialize();
        const item = container.children[0];
        item.click();

        model = selectItemById(model, '1'); 
    
        expect(getSelectedItems(model)).toEqual([{ id: '1', label: 'Item 1' }]);
        expect(selectedItemsContainer.textContent).toBe('Selected Items: 1');
    });
    
});
