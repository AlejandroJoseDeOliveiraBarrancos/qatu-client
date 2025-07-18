import { renderItems, updateSelection, bindSelectItem, displaySelectedItems } from './ListboxView.js';
import { getItems, getSelectedItems, selectItemById, toggleSelectItemById, clearSelection } from './ListboxModel.js';

export const createListboxViewModel = (model, container, selectedItemsContainer, selectionMode) => {
    const handleSelectItem = (itemId) => {
        if (selectionMode === 'multiple') {
            model = toggleSelectItemById(model, itemId);
        } else {
            model = clearSelection(model);
            model = selectItemById(model, itemId);
        }
        updateView();
    };

    const updateView = () => {
        const selectedItems = new Set(getSelectedItems(model).map(item => item.id));
        updateSelection(container, selectedItems);
        displaySelectedItems(selectedItemsContainer, selectedItems);
    };

    const initialize = () => {
        renderItems(container, getItems(model));
        bindSelectItem(container, handleSelectItem);
        updateView();
    };

    return { initialize };
};
