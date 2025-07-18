import { createListboxModel, setItems, selectItemById, toggleSelectItemById, getItems, getSelectedItems, setSelectionMode, clearSelection } from '../../ListboxModel.js';
import { SELECTION_MODE } from '../../constans.js';

describe('ListboxModel', () => {
    let model;

    beforeEach(() => {
        model = createListboxModel([
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' }
        ]);
    });

    test('should initialize with items', () => {
        expect(getItems(model)).toEqual([
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' },
        ]);
    });

    test('should validate items correctly', () => {
        const newItems = [
            { id: '4', label: 'Item 4' },
            { id: '5' }  // Invalid item
        ];
        const newModel = setItems(model, newItems);
        expect(getItems(newModel)).toEqual([{ id: '4', label: 'Item 4' }]);
    });

    test('should clear selection when setting new items', () => {
        const newModel = selectItemById(model, '1');
        const updatedModel = setItems(newModel, [
            { id: '4', label: 'Item 4' },
            { id: '5', label: 'Item 5' },
        ]);
        expect(getSelectedItems(updatedModel)).toEqual([]);
    });

    test('should allow single selection', () => {
        const newModel = selectItemById(model, '1');
        expect(getSelectedItems(newModel)).toEqual([{ id: '1', label: 'Item 1' }]);

        const updatedModel = selectItemById(newModel, '2');
        expect(getSelectedItems(updatedModel)).toEqual([{ id: '2', label: 'Item 2' }]);
    });

    test('should allow multiple selections', () => {
        let newModel = setSelectionMode(model, SELECTION_MODE.MULTIPLE);
        newModel = toggleSelectItemById(newModel, '1');
        expect(getSelectedItems(newModel)).toEqual([{ id: '1', label: 'Item 1' }]);

        newModel = toggleSelectItemById(newModel, '2');
        expect(getSelectedItems(newModel)).toEqual([
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' }
        ]);
    });

    test('should clear selection', () => {
        let newModel = selectItemById(model, '1');
        newModel = clearSelection(newModel);
        expect(getSelectedItems(newModel)).toEqual([]);
    });

    test('should handle invalid item selection', () => {
        console.error = jest.fn();
        const newModel = selectItemById(model, 'invalid-id');
        expect(console.error).toHaveBeenCalledWith('Item with ID invalid-id not found.');
    });
});
