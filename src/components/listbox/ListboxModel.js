import { SELECTION_MODE } from './constans.js';

export const createListboxModel = (items = [], selectionMode = SELECTION_MODE.SINGLE) => ({
    items: items.filter(validateItem),
    selectedItemIds: new Set(),
    selectionMode,
});

const validateItem = (item) => item && typeof item.id === 'string' && typeof item.label === 'string';

export const setItems = (model, items, retainSelection = false) => ({
    ...model,
    items: items.filter(validateItem),
    selectedItemIds: retainSelection ? model.selectedItemIds : new Set(),
});

export const getItems = (model) => model.items;

export const getSelectedItems = (model) => model.items.filter(item => model.selectedItemIds.has(item.id));

export const setSelectionMode = (model, mode) => (
    mode === SELECTION_MODE.SINGLE || mode === SELECTION_MODE.MULTIPLE
        ? { ...model, selectionMode: mode }
        : model
);

export const selectItemById = (model, itemId) => {
    if (!model.items.some(item => item.id === itemId)) {
        console.error(`Item with ID ${itemId} not found.`);
        return model;
    }
    const newSelectedItemIds = model.selectionMode === SELECTION_MODE.SINGLE ? new Set([itemId]) : new Set([...model.selectedItemIds, itemId]);
    return { ...model, selectedItemIds: newSelectedItemIds };
};

export const toggleSelectItemById = (model, itemId) => {
    if (!model.items.some(item => item.id === itemId)) return model;

    const newSelectedItemIds = new Set(model.selectedItemIds);
    if (model.selectionMode === SELECTION_MODE.MULTIPLE) {
        newSelectedItemIds.has(itemId) ? newSelectedItemIds.delete(itemId) : newSelectedItemIds.add(itemId);
    } else {
        newSelectedItemIds.clear();
        newSelectedItemIds.add(itemId);
    }

    return { ...model, selectedItemIds: newSelectedItemIds };
};

export const clearSelection = (model) => ({
    ...model,
    selectedItemIds: new Set(),
});
