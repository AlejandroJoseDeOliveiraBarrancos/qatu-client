export const createFooterViewModel = (model, view) => {
    const initialize = () => {
        view.renderFooter(model);
    };

    return {
        initialize
    };
};