import { createCarouselModel } from './CarouselModel.js';

export const createCarouselViewModel = (items) => {
  let model;
  try {
    model = createCarouselModel(items);
  } catch (error) {
    console.error("Failed to initialize CarouselModel:", error.message);
    model = createCarouselModel([]);
  }

  const getCurrentItem = () => model.getCurrentItem();
  const next = () => model.next();
  const previous = () => model.previous();
  const hasNext = () => model.hasNext();
  const hasPrevious = () => model.hasPrevious();

  return {
    getCurrentItem,
    next,
    previous,
    hasNext,
    hasPrevious,
  };
};