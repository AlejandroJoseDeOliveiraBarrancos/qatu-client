import { createPanelView } from '../../ProductPanelView.js';

describe('PanelView', () => {
    let container;
    let filterContainer;

    beforeEach(() => {
        container = document.createElement('div');
        filterContainer = document.createElement('div');
    });

    test('should render filter, sort, and pagination elements', () => {
        const view = createPanelView(container, filterContainer);

        expect(filterContainer.querySelector('#category-filter')).not.toBeNull();
        expect(filterContainer.querySelector('#price-filter')).not.toBeNull();
        expect(filterContainer.querySelector('#sort-menu')).not.toBeNull();
        expect(filterContainer.querySelector('.pagination-container')).not.toBeNull();
    });

    test('should render product cards container', () => {
        const view = createPanelView(container, filterContainer);

        expect(container.querySelector('.product-cards-container')).not.toBeNull();
    });

    test('should return DOM elements for filters and pagination', () => {
        const view = createPanelView(container, filterContainer);

        expect(view.getCriteriaFilter().id).toBe('category-filter');
        expect(view.getPriceFilter().id).toBe('price-filter');
        expect(view.getSortMenu().id).toBe('sort-menu');
        expect(view.getPrevButton().id).toBe('prev-page');
        expect(view.getNextButton().id).toBe('next-page');
    });

    test('should render panel with product card containers', () => {
        const view = createPanelView(container, filterContainer);
        const models = [{}, {}, {}];

        const renderedCards = view.renderPanel(models);

        expect(renderedCards.length).toBe(models.length);
        expect(container.querySelectorAll('.card-container').length).toBe(models.length);
    });
});
