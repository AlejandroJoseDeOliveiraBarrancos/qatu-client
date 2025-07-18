export const DEFAULTS = {
    EMPTY_ITEM: { image: '', title: 'No Image', description: 'No description available.' },
    ERROR_MESSAGES: {
        NULL_VIEWMODEL: "ViewModel cannot be null or undefined.",
        INVALID_ITEMS: "Items must be an array of objects with 'image', 'title', and 'description' properties.",
        NO_ITEMS: "No items available in the carousel.",
    },
    CAROUSEL_SETTINGS: {
        BUTTON_POSITION: {
            PREV: 'left: 10px;',
            NEXT: 'right: 10px;',
        },
        BUTTON_STYLES: {
            BASE: 'position: absolute; top: 50%; transform: translateY(-50%); background-color: #007bff; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s;',
            HOVER: 'background-color: #0056b3;',
        },
    },
};