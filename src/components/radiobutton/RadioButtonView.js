export const renderRadioButton = (container, { label, isSelected, name }, handler) => {
    const radioId = `${name}-${label}`;
    const radioHTML = `
        <label for="${radioId}">
            <input type="radio" id="${radioId}" name="${name}" ${isSelected ? 'checked' : ''}>
            ${label}
        </label>
    `;
    container.insertAdjacentHTML('beforeend', radioHTML);

    const radio = container.querySelector(`input[id="${radioId}"]`);
    radio?.addEventListener('click', handler);
};
