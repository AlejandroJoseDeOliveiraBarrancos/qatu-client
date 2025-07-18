import { DEFAULTS } from './constants.js';

export const createCarouselView = (viewModel) => {
  if (!viewModel) {
    throw new Error(DEFAULTS.ERROR_MESSAGES.NULL_VIEWMODEL);
  }

  const carouselElement = document.createElement('div');
  carouselElement.classList.add('carousel');

  const render = () => {
    const currentItem = viewModel.getCurrentItem();

    carouselElement.innerHTML = '';

    carouselElement.innerHTML = `
      <div class="carousel-content">
        <img src="${currentItem.image}" alt="${currentItem.title}" class="carousel-image" />
        <h3>${currentItem.title}</h3>
        <p>${currentItem.description}</p>
      </div>
      ${renderButton('prev', 'Previous', viewModel.hasPrevious())}
      ${renderButton('next', 'Next', viewModel.hasNext())}
    `;

    setupEventListeners();
  };

  const renderButton = (className, label, isEnabled) => {
    const style = DEFAULTS.CAROUSEL_SETTINGS.BUTTON_STYLES.BASE +
                  (className === 'prev' ? DEFAULTS.CAROUSEL_SETTINGS.BUTTON_POSITION.PREV : DEFAULTS.CAROUSEL_SETTINGS.BUTTON_POSITION.NEXT);
    const disabledAttribute = isEnabled ? '' : 'disabled';

    return `<button class="carousel-button ${className}" style="${style}" ${disabledAttribute}>${label}</button>`;
  };

  const setupEventListeners = () => {
    const nextButton = carouselElement.querySelector('.next');
    const prevButton = carouselElement.querySelector('.prev');

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        viewModel.next();
        render();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        viewModel.previous();
        render();
      });
    }
  };

  return {
    render,
    getElement: () => carouselElement,
  };
};