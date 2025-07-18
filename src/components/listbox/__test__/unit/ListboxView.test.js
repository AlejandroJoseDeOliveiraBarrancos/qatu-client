import { initializeListboxView, renderItems, updateSelection, bindSelectItem, displaySelectedItems } from '../../ListboxView.js';
import { DOM_ATTRIBUTES } from '../../constans.js';

describe('ListboxView', () => {
    let container, selectedItemsContainer;

    beforeEach(() => {
        container = document.createElement('div');
        selectedItemsContainer = document.createElement('div');
    });

    test('should initialize view correctly', () => {
        initializeListboxView(container, selectedItemsContainer, { scrollHeight: 200 });
        expect(container.style.maxHeight).toBe('200px');
        expect(container.style.overflowY).toBe('auto');
        expect(container.getAttribute(DOM_ATTRIBUTES.ROLE)).toBe('listbox');
        expect(container.getAttribute(DOM_ATTRIBUTES.TAB_INDEX)).toBe('0');
    });

    test('should render items correctly', () => {
        renderItems(container, [{ id: '1', label: 'Item 1' }, { id: '2', label: 'Item 2' }]);
        expect(container.children.length).toBe(2);
        expect(container.children[0].dataset.itemId).toBe('1');
        expect(container.children[1].dataset.itemId).toBe('2');
    });

    test('should update selection', () => {
        renderItems(container, [{ id: '1', label: 'Item 1' }, { id: '2', label: 'Item 2' }]);
        updateSelection(container, new Set(['1']));
        expect(container.children[0].classList.contains('selected')).toBe(true);
        expect(container.children[1].classList.contains('selected')).toBe(false);
    });

    test('should display selected items', () => {
        renderItems(container, [{ id: '1', label: 'Item 1' }]);
        updateSelection(container, new Set(['1']));
        displaySelectedItems(selectedItemsContainer, new Set(['1']));
        expect(selectedItemsContainer.textContent).toBe('Selected Items: 1');
    });

    test('should handle item click event', () => {
        const mockHandler = jest.fn();
        bindSelectItem(container, mockHandler);
        renderItems(container, [{ id: '1', label: 'Item 1' }]);
        container.children[0].click();
        expect(mockHandler).toHaveBeenCalledWith('1');
    });
});
