import { createBannerModel } from '../../BannerModel.js';
import { createBannerView } from '../../BannerView.js';
import { createBannerViewModel } from '../../BannerViewModel.js';

describe('Banner Integration', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should initialize banner view model and render banners correctly', () => {
        const bannersData = [
            { title: 'Welcome', subtitle: 'Enjoy our platform', link: 'https://example.com', image: 'image1.jpg' },
            { title: 'Sale', subtitle: '50% off', link: 'https://example.com/sale', image: 'image2.jpg' }
        ];

        const model = createBannerModel(bannersData);
        const view = createBannerView(container);
        const viewModel = createBannerViewModel(model, view);

        viewModel.initializeBanner();

        expect(container.querySelector('.banner-container')).not.toBeNull();
        expect(container.querySelector('h1').textContent).toBe('Welcome');
        expect(container.querySelectorAll('.dot').length).toBe(2);
    });

    test('should change banner when navigation button is clicked', () => {
        const bannersData = [
            { title: 'Welcome', subtitle: 'Enjoy our platform', link: 'https://example.com', image: 'image1.jpg' },
            { title: 'Sale', subtitle: '50% off', link: 'https://example.com/sale', image: 'image2.jpg' }
        ];

        const model = createBannerModel(bannersData);
        const view = createBannerView(container);
        const viewModel = createBannerViewModel(model, view);

        viewModel.initializeBanner();
        const nextButton = container.querySelector('.arrow.right');
        nextButton.click();

        expect(container.querySelector('h1').textContent).toBe('Sale');
        expect(container.style.backgroundImage).toContain('image2.jpg');
    });
});
