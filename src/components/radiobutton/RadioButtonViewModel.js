import { renderRadioButton, bindClick } from './RadioButtonView.js';

export const createRadioButtonViewModel = (model, container, groupName, onSelection) => {
    const label = model.label;
    
    renderRadioButton(container, {
        label,
        isSelected: model.isSelected,
        name: groupName
    });

    bindClick(container, groupName, () => {
        onSelection();
        model = { ...model, isSelected: true };
    });

    return model;
};
