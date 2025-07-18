import { BUTTON_MODE } from './constants.js';

export const renderButton = (container, { label, mode }) => {
    container.innerHTML = `<button class="text-button ${mode}">${label}</button>`;
};

export const bindClick = (container, handler) => {
    container.querySelector('.text-button')?.addEventListener('click', handler);
};
