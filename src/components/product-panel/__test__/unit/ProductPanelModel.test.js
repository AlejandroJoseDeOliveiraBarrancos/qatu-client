import { createPanelModel } from '../../ProductPanelModel.js';
import { createCardModel } from '../../../card/CardModel.js';

jest.mock('../../../card/CardModel.js', () => ({
    createCardModel: jest.fn((productId, name, description, price, status, creationDate) => ({
        productId,
        name,
        description,
        price,
        status,
        creationDate
    }))
}));

describe('PanelModel', () => {
    let panelModel;

    beforeEach(() => {
        panelModel = createPanelModel([
            {
                productId: '1',
                name: 'Product 1',
                description: 'Description 1',
                price: 100,
                status: 'available',
                creationDate: '2024-01-01'
            }
        ]);
    });

    test('should create initial card items correctly', () => {
        const cardItems = panelModel.getCardItems();
        expect(cardItems).toHaveLength(1);
        expect(createCardModel).toHaveBeenCalledWith(
            '1',
            'Product 1',
            'Description 1',
            100,
            'available',
            '2024-01-01'
        );
    });

    test('should update card items when new items are provided', () => {
        const newItems = [
            {
                productId: '2',
                name: 'Product 2',
                description: 'Description 2',
                price: 150,
                status: 'out of stock',
                creationDate: '2024-02-01'
            }
        ];
        
        panelModel.update(newItems);
        const cardItems = panelModel.getCardItems();

        expect(cardItems).toHaveLength(1);
        expect(createCardModel).toHaveBeenCalledWith(
            '2',
            'Product 2',
            'Description 2',
            150,
            'out of stock',
            '2024-02-01'
        );
    });

    test('should log a warning when an empty array is provided during initialization', () => {
        console.warn = jest.fn();
        createPanelModel([]);
        expect(console.warn).toHaveBeenCalledWith('Array vacío, no hay elementos para mostrar.');
    });

    test('should log a warning when updating with an empty array', () => {
        console.warn = jest.fn();
        panelModel.update([]);
        expect(console.warn).toHaveBeenCalledWith('Array vacío, no hay elementos para mostrar.');
    });

    test('should return an empty array when initialized with an empty array', () => {
        const emptyModel = createPanelModel([]);
        expect(emptyModel.getCardItems()).toEqual([]);
    });
});
