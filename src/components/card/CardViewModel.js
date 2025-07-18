export const createCardViewModel = (model, view) => {
  const handleButtonClick = () => {
    if (model.url) {
      window.location.href = model.url
    }
  }

  const initialize = () => {
    if (!view || typeof view.renderCard !== 'function') {
        console.error("Error: 'view' is not correctly defined or does not have 'renderCard'", view);
        return;
    }
    if (!model) {
        console.error("Error: 'model' is not defined or is missing required properties", model);
        return;
    }
    
    view.renderCard(model);
    view.bindButtonClick(handleButtonClick);
};

  return {
    initialize,
  }
}
