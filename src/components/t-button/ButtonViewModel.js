import { renderButton, bindClick } from './ButtonView.js';
import { getLabel } from './ButtonModel.js';

export const createButtonViewModel = (model, container) => {
    const render = () => {
        renderButton(container, {
            label: getLabel(model),
            mode: model.mode
        });
    };

    const handleClick = () => {
        alert(`You clicked: ${getLabel(model)}`);
    };

    return {
        render,
        bindEvents: () => bindClick(container, handleClick)
    };
};
