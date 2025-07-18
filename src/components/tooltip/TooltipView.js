export const initializeTooltipView = (container) => {
    const tooltipHTML = `
        <div class="tooltip-content" style="display: none;">
            <span class="tooltip-text"></span>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', tooltipHTML);
};

export const renderTooltip = (container, content, isVisible) => {
    const tooltipElement = container.querySelector('.tooltip-content');
    const tooltipText = container.querySelector('.tooltip-text');

    tooltipText.innerText = content;
    tooltipElement.style.display = isVisible ? 'block' : 'none';
    tooltipElement.style.opacity = isVisible ? '1' : '0'; 
};

export const bindHover = (container, showHandler, hideHandler) => {
    container.addEventListener('mouseover', showHandler);
    container.addEventListener('mouseout', hideHandler);
};
