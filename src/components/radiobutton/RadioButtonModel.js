export const createRadioButtonModel = (label = '', isSelected = false) => ({
    label,
    isSelected,
});

export const setLabel = (model, label) => ({
    ...model,
    label,
});

export const setSelected = (model, isSelected) => ({
    ...model,
    isSelected,
});

export const getLabel = model => model.label;

export const isSelected = model => model.isSelected;
