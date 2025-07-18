import { DEFAULTS } from './constants.js';

export const createCarouselModel = (items) => {
  const validateItems = (items) => {
    if (!Array.isArray(items) || !items.every(item => item.image && item.title && item.description)) {
      throw new Error(DEFAULTS.ERROR_MESSAGES.INVALID_ITEMS);
    }
    return items;
  };

  const state = {
    items: validateItems(items),
    currentIndex: 0,
  };

  const getCurrentItem = () => state.items.length > 0 ? state.items[state.currentIndex] : DEFAULTS.EMPTY_ITEM;
  const hasNext = () => state.items.length > 1;
  const hasPrevious = () => state.items.length > 1;

  const next = () => {
    if (!hasNext()) {
      console.warn(DEFAULTS.ERROR_MESSAGES.NO_ITEMS);
      return;
    }
    state.currentIndex = (state.currentIndex + 1) % state.items.length;
  };

  const previous = () => {
    if (!hasPrevious()) {
      console.warn(DEFAULTS.ERROR_MESSAGES.NO_ITEMS);
      return;
    }
    state.currentIndex = (state.currentIndex - 1 + state.items.length) % state.items.length;
  };

  return {
    getCurrentItem,
    hasNext,
    hasPrevious,
    next,
    previous,
  };
};