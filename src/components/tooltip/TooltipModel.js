export const createTooltipModel = (content = '', isVisible = false) => ({
    content,
    isVisible,
});

export const setContent = (model, content) => ({
    ...model,
    content,
});

export const setVisibility = (model, isVisible) => ({
    ...model,
    isVisible,
});

export const getContent = (model) => model.content;

export const getVisibility = (model) => model.isVisible;
