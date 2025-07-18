import { createBannerModel } from '../../BannerModel.js';

describe('BannerModel', () => {
    test('should create banner models with valid data', () => {
        const bannersData = [
            { title: 'Welcome', subtitle: 'Enjoy our platform', link: 'https://example.com', image: 'image1.jpg' },
            { title: 'Sale', subtitle: '50% off', link: 'https://example.com/sale', image: 'image2.jpg' }
        ];

        const models = createBannerModel(bannersData);
        expect(models).toEqual(bannersData);
    });

    test('should throw an error for invalid banners data', () => {
        expect(() => createBannerModel([])).toThrow('The banners array must have elements.');
        expect(() => createBannerModel('Invalid data')).toThrow('The banners array must have elements.');
    });
});
