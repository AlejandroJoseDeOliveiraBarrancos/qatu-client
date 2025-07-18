import { createCardViewModel } from '../../CardViewModel.js';

describe('CardViewModel', () => {
    let model;
    let mockView;

    beforeEach(() => {
        model = {
            title: 'Sample Title',
            description: 'Sample Description',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            buttonText: 'Click Me',
            author: 'Author Name',
            date: new Date('2024-01-01'),
            additionalInfo: 'Additional Info',
            url: 'http://example.com'
        };

        mockView = {
            renderCard: jest.fn(),
            bindButtonClick: jest.fn()
        };
    });

    test('should initialize the view and bind the button click event', () => {
        const viewModel = createCardViewModel(model, mockView);

        viewModel.initialize();

        expect(mockView.renderCard).toHaveBeenCalledWith(model);
        expect(mockView.bindButtonClick).toHaveBeenCalled();
    });

    test('should handle button click and navigate to model URL', () => {
        const viewModel = createCardViewModel(model, mockView);

        delete window.location;
        window.location = { href: '' }; 

        mockView.bindButtonClick.mockImplementation((handler) => {
            handler();
        });
    
        viewModel.initialize();
    
        expect(window.location.href).toBe(model.url);
    });
    
});
