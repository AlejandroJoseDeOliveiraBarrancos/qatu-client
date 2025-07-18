import { createPanelModel } from '../../ProductPanelModel.js';
import { createPanelView } from '../../ProductPanelView.js';
import { createPanelViewModel } from '../../ProductPanelViewModel.js';
import { fetchProducts } from '../../../../services/ProductService.js';

jest.mock('../../../card/CardViewModel.js', () => ({
    createCardViewModel: jest.fn(() => ({
        initialize: jest.fn()
    }))
}));

jest.mock('../../../../services/ProductService.js', () => ({
    fetchProducts: jest.fn()
}));

describe('ProductPanel Integration', () => {
    let container, filterContainer, model, view, viewModel;

    beforeEach(() => {
        container = document.createElement('div');
        filterContainer = document.createElement('div');
        document.body.appendChild(container);
        document.body.appendChild(filterContainer);

        model = createPanelModel([]);
        view = createPanelView(container, filterContainer);
        viewModel = createPanelViewModel(model, view);

        fetchProducts.mockResolvedValue([
            {
                productId: '1',
                name: 'Product 1',
                description: 'Description 1',
                price: 100,
                creationDate: '2024-01-01T00:00:00Z',
                status: 'available'
            },
            {
                productId: '2',
                name: 'Product 2',
                description: 'Description 2',
                price: 150,
                creationDate: '2024-02-01T00:00:00Z',
                status: 'out of stock'
            }
        ]);
    });

    afterEach(() => {
        document.body.removeChild(container);
        document.body.removeChild(filterContainer); 
        jest.clearAllMocks();
    });

    test('should update products when category filter changes', async () => {
        const categoryFilter = view.getCriteriaFilter();
        categoryFilter.value = 'category2';
        categoryFilter.dispatchEvent(new Event('change'));

        await viewModel.initializePanel();
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should update products when price filter changes', async () => {
        const priceFilter = view.getPriceFilter();
        priceFilter.value = '51-100';
        priceFilter.dispatchEvent(new Event('change'));

        await viewModel.initializePanel();
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should update products when sort menu changes', async () => {
        const sortMenu = view.getSortMenu();
        sortMenu.value = 'price';
        sortMenu.dispatchEvent(new Event('change'));

        await viewModel.initializePanel();
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should navigate to the next page and load products', async () => {
        const nextButton = view.getNextButton();
        nextButton.dispatchEvent(new Event('click'));

        await viewModel.initializePanel();
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should navigate to the previous page and load products', async () => {
        viewModel.currentPage = 2; 
        const prevButton = view.getPrevButton();
        prevButton.dispatchEvent(new Event('click'));

        await viewModel.initializePanel();
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });
});
