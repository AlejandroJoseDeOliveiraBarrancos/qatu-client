import { createCardView } from '../../CardView.js';

describe('CardView', () => {
    let container;
    let view;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        view = createCardView(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should render a card correctly', () => {
        const model = {
            name: 'Sample Title',
            description: 'Sample Description',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            buttonText: 'Click Me',
            url: 'https://example.com'
        };

        view.renderCard(model);

        const card = container.querySelector('.card');
        const title = card.querySelector('h2');
        const description = card.querySelector('p');
        const button = card.querySelector('button');

        expect(card).not.toBeNull();
        expect(title).not.toBeNull();
        expect(title.textContent).toBe('Sample Title');
        expect(description).not.toBeNull();
        expect(description.textContent).toBe('Sample Description');
        expect(button).not.toBeNull();
        expect(button.textContent).toBe('Click Me');
    });

    test('should handle button click event', () => {
        const mockHandler = jest.fn();
        view.bindButtonClick(mockHandler);

        const button = document.createElement('button');
        button.dataset.url = 'https://example.com';
        container.appendChild(button);
        button.click();

        expect(mockHandler).toHaveBeenCalledWith('https://example.com');
    });

    test('should log error if container is invalid', () => {
        const invalidContainer = {};
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const invalidView = createCardView(invalidContainer);
        invalidView.renderCard({});

        expect(consoleSpy).toHaveBeenCalledWith(
            "Error: 'container' no es un elemento HTML válido:",
            invalidContainer
        );

        consoleSpy.mockRestore();
    });

    test('should pass correct URL to handler on button click', () => {
        const model = {
            name: 'Sample Title',
            description: 'Sample Description',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
            buttonText: 'Click Me',
            url: 'https://example.com'
        };

        view.renderCard(model);

        const mockHandler = jest.fn();
        view.bindButtonClick(mockHandler);

        const button = container.querySelector('button');
        button.click();

        expect(mockHandler).toHaveBeenCalledWith('https://example.com');
    });
});
