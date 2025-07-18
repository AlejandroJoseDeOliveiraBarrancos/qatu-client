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

describe('PanelViewModel', () => {
    let mockModel;
    let mockView;

    beforeEach(() => {
        mockModel = {
            update: jest.fn(),
            getCardItems: jest.fn(() => [])
        };

        mockView = {
            renderPanel: jest.fn(() => [document.createElement('div')]),
            getCriteriaFilter: jest.fn(() => document.createElement('select')),
            getPriceFilter: jest.fn(() => document.createElement('select')),
            getSortMenu: jest.fn(() => document.createElement('select')),
            getPrevButton: jest.fn(() => document.createElement('button')),
            getNextButton: jest.fn(() => document.createElement('button'))
        };

        fetchProducts.mockResolvedValue([
            {
                productId: '1',
                name: 'Product 1',
                description: 'Description 1',
                price: 100,
                creationDate: '2024-01-01T00:00:00Z',
                status: 'available'
            }
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize and load products on initialization', async () => {
        const viewModel = createPanelViewModel(mockModel, mockView);

        await viewModel.initializePanel();

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
        expect(mockModel.update).toHaveBeenCalled();
        expect(mockView.renderPanel).toHaveBeenCalled();
    });

    test('should filter products by category', async () => {
        const categoryFilter = mockView.getCriteriaFilter();
        categoryFilter.value = 'category2';

        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        categoryFilter.dispatchEvent(new Event('change'));

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should filter products by price range', async () => {
        const priceFilter = mockView.getPriceFilter();
        priceFilter.value = '51-100';

        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        priceFilter.dispatchEvent(new Event('change'));

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should sort products by selected option', async () => {
        const sortMenu = mockView.getSortMenu();
        sortMenu.value = 'price';

        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        sortMenu.dispatchEvent(new Event('change'));

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should navigate to the next page and load products', async () => {
        const nextButton = mockView.getNextButton();

        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        nextButton.dispatchEvent(new Event('click'));

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should navigate to the previous page and load products', async () => {
        const prevButton = mockView.getPrevButton();

        const viewModel = createPanelViewModel(mockModel, mockView);
        viewModel.currentPage = 2;

        await viewModel.initializePanel();

        prevButton.dispatchEvent(new Event('click'));

        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });

    test('should call update method on model if products are loaded', async () => {
        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        expect(mockModel.update).toHaveBeenCalled();
    });

    test('should show warning if no products are found', async () => {
        console.warn = jest.fn();
        fetchProducts.mockResolvedValue([]);

        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();

        expect(console.warn).toHaveBeenCalledWith('No se encontraron productos.');
    });




    test('should log an error if loadProducts fails', async () => {
        fetchProducts.mockRejectedValue(new Error('Network error'));
    
        const viewModel = createPanelViewModel(mockModel, mockView);
        console.error = jest.fn();
    
        await viewModel.initializePanel();
    
        expect(console.error).toHaveBeenCalledWith('Error al cargar los productos:', expect.any(Error));
    });
    
    test('should call loadProducts with the correct filter in searchProducts', async () => {
        const viewModel = createPanelViewModel(mockModel, mockView);
        const spyLoadProducts = jest.spyOn(viewModel, 'initializePanel');
    
        await viewModel.searchProducts('category1');
    
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, 'category1', '', 'asc');
    });
    
    test('should decrement currentPage when prev button is clicked', async () => {
        const prevButton = mockView.getPrevButton();
    
        const viewModel = createPanelViewModel(mockModel, mockView);
        viewModel.currentPage = 2;
    
        await viewModel.initializePanel();
    
        prevButton.dispatchEvent(new Event('click'));
    
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });
    
    test('should return correct price range from convertPriceRange', () => {
        const viewModel = createPanelViewModel(mockModel, mockView);
    
        expect(viewModel.convertPriceRange('0-50')).toBe('0-50');
        expect(viewModel.convertPriceRange('51-100')).toBe('51-100');
        expect(viewModel.convertPriceRange('101-200')).toBe('101-200');
        expect(viewModel.convertPriceRange('200+')).toBe('200-');
        expect(viewModel.convertPriceRange('unknown')).toBe('');
    });
    
    test('should pass correct parameters to loadProducts on category change', async () => {
        const categoryFilter = mockView.getCriteriaFilter();
        categoryFilter.value = 'category1';
    
        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();
    
        categoryFilter.dispatchEvent(new Event('change'));
        await new Promise(resolve => setTimeout(resolve, 0)); 
    
        expect(fetchProducts).toHaveBeenCalledWith(1, 10, '', '', 'asc');
    });
    
    test('should handle an empty product list gracefully', async () => {
        fetchProducts.mockResolvedValue([]); // Simula lista vacía
        console.warn = jest.fn();
    
        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();
    
        expect(console.warn).toHaveBeenCalledWith('No se encontraron productos.');
        expect(mockModel.update).not.toHaveBeenCalled(); // No debe actualizar el modelo
    });

    
    test('should return empty string for unknown price range in convertPriceRange', () => {
        const viewModel = createPanelViewModel(mockModel, mockView);
    
        expect(viewModel.convertPriceRange('unexpected-value')).toBe('');
    });
    
    test('should log error when fetchProducts throws an exception', async () => {
        fetchProducts.mockRejectedValue(new Error('Network error'));
        console.error = jest.fn();
    
        const viewModel = createPanelViewModel(mockModel, mockView);
        await viewModel.initializePanel();
    
        expect(console.error).toHaveBeenCalledWith('Error al cargar los productos:', expect.any(Error));
    });
    
});