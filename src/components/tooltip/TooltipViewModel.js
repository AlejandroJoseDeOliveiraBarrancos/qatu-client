import { renderTooltip, initializeTooltipView, bindHover } from './TooltipView.js';
import { setVisibility, getContent, getVisibility } from './TooltipModel.js';

export const createTooltipViewModel = (model, container) => {
    const showTooltip = () => {
        model = setVisibility(model, true);
        renderTooltip(container, getContent(model), getVisibility(model));
    };

    const hideTooltip = () => {
        model = setVisibility(model, false);
        renderTooltip(container, getContent(model), getVisibility(model));
    };

    const initialize = () => {
        initializeTooltipView(container);
        renderTooltip(container, getContent(model), getVisibility(model));
        bindHover(container, showTooltip, hideTooltip); 
    };

    return { initialize };
};
