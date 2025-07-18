import { DOM_ATTRIBUTES, DEFAULT_SCROLL_HEIGHT } from './constans.js';

export const initializeListboxView = (container, selectedItemsContainer, { scrollHeight = DEFAULT_SCROLL_HEIGHT }) => {
    container.style.maxHeight = `${scrollHeight}px`;
    container.style.overflowY = 'auto';
    container.setAttribute(DOM_ATTRIBUTES.ROLE, 'listbox');
    container.setAttribute(DOM_ATTRIBUTES.TAB_INDEX, '0');
};

export const renderItems = (container, items) => {
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'listbox-item';
        listItem.dataset.itemId = item.id;
        listItem.setAttribute(DOM_ATTRIBUTES.OPTION, 'option');
        const text = document.createElement('span');
        text.textContent = item.label;
        listItem.appendChild(text);
        fragment.appendChild(listItem);
    });
    container.innerHTML = '';
    container.appendChild(fragment);
};

export const updateSelection = (container, selectedItems) => {
    Array.from(container.children).forEach(child => {
        const isSelected = selectedItems.has(child.dataset.itemId);
        child.classList.toggle('selected', isSelected);
    });
};

export const bindSelectItem = (container, handler) => {
    container.addEventListener('click', event => {
        const itemId = event.target.closest('.listbox-item')?.dataset.itemId;
        if (itemId) {
            handler(itemId);
        }
    });
};

export const displaySelectedItems = (selectedItemsContainer, selectedItems) => {
    selectedItemsContainer.textContent = `Selected Items: ${Array.from(selectedItems).join(', ')}`;
};