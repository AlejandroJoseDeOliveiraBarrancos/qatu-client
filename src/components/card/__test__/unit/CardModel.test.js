import { createCardModel } from '../../CardModel.js';

describe('CardModel', () => {
    test('should create a valid card model with correct data', () => {
        const model = createCardModel(
            '123',
            'Product Name',
            'This is a product description.',
            50.5,
            'available',
            '2024-01-01T00:00:00Z'
        );

        expect(model).toEqual({
            name: 'Product Name',
            description: 'This is a product description.',
            price: '50.50',
            status: 'available',
            creationDate: new Date('2024-01-01T00:00:00Z')
        });
    });

    test('should throw an error for an empty name', () => {
        expect(() => {
            createCardModel(
                '123',
                '',
                'Valid description',
                50,
                'available',
                '2024-01-01T00:00:00Z'
            );
        }).toThrow('The name must be a non-empty string.');
    });

    test('should throw an error for an invalid price', () => {
        expect(() => {
            createCardModel(
                '123',
                'Product Name',
                'Valid description',
                -10,
                'available',
                '2024-01-01T00:00:00Z'
            );
        }).toThrow('The price must be a positive number.');
    });

    test('should throw an error for an invalid creation date', () => {
        expect(() => {
            createCardModel(
                '123',
                'Product Name',
                'Valid description',
                50,
                'available',
                'invalid-date'
            );
        }).toThrow('The creationDate must be a valid Date.');
    });

    test('should throw an error for an empty status', () => {
        expect(() => {
            createCardModel(
                '123',
                'Product Name',
                'Valid description',
                50,
                '',
                '2024-01-01T00:00:00Z'
            );
        }).toThrow('The status must be a non-empty string.');
    });

    test('should throw an error for an empty description', () => {
        expect(() => {
            createCardModel(
                '123',
                'Product Name',
                '',
                50,
                'available',
                '2024-01-01T00:00:00Z'
            );
        }).toThrow('The description must be a string.');
    });
});
