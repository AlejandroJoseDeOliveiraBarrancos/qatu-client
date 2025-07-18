import { BUTTON_MODE } from './constants.js';

export const createButtonModel = (label = '', mode = BUTTON_MODE.PRIMARY) => ({
    label,
    mode,
});

export const setLabel = (model, label) => ({
    ...model,
    label,
});

export const setMode = (model, mode) => (
    mode === BUTTON_MODE.PRIMARY || mode === BUTTON_MODE.SECONDARY 
        ? { ...model, mode }
        : model
);

export const getLabel = (model) => model.label;

export const getMode = (model) => model.mode;
