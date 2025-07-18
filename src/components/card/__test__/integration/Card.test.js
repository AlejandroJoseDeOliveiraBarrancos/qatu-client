import { createCardModel } from '../../CardModel.js';
import { createCardView } from '../../CardView.js';
import { createCardViewModel } from '../../CardViewModel.js';

describe('Card Integration', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should create, render, and initialize a card correctly', () => {
        const model = {
            ...createCardModel(
                '123',
                'Product Name',
                'This is a product description.',
                50.5,
                'available',
                '2024-01-01T00:00:00Z'
            ),
            buttonText: 'Ver más'
        };
    
        const view = createCardView(container);
        const viewModel = createCardViewModel(model, view);
    
        viewModel.initialize();
    
        expect(container.querySelector('.card')).not.toBeNull();
        expect(container.querySelector('.card h2').textContent).toBe('Product Name');
        expect(container.querySelector('.card p').textContent).toBe('This is a product description.');
        expect(container.querySelector('.card button').textContent).toBe('Ver más');
    });
    

    test('should handle button click and navigate to the model URL', () => {
        const model = {
            ...createCardModel(
                '123',
                'Product Name',
                'This is a product description.',
                50.5,
                'available',
                '2024-01-01T00:00:00Z'
            ),
            url: 'http://example.com'
        };

        const view = createCardView(container);
        const viewModel = createCardViewModel(model, view);
        delete window.location;
        window.location = { href: '', assign: jest.fn() };

        viewModel.initialize();
        const button = container.querySelector('.card button');
        button.click();

        expect(window.location.href).toBe(model.url);
    });

    test('should log an error when view is invalid in viewModel initialization', () => {
        console.error = jest.fn();

        const model = createCardModel(
            '123',
            'Product Name',
            'This is a product description.',
            50.5,
            'available',
            '2024-01-01T00:00:00Z'
        );

        const invalidView = null;
        const viewModel = createCardViewModel(model, invalidView);

        viewModel.initialize();

        expect(console.error).toHaveBeenCalledWith("Error: 'view' is not correctly defined or does not have 'renderCard'", invalidView);
    });

    test('should log an error when model is invalid in viewModel initialization', () => {
        console.error = jest.fn();

        const view = createCardView(container);
        const invalidModel = null;
        const viewModel = createCardViewModel(invalidModel, view);

        viewModel.initialize();

        expect(console.error).toHaveBeenCalledWith("Error: 'model' is not defined or is missing required properties", invalidModel);
    });
});