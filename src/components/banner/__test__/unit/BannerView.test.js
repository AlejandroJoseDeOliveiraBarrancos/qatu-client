import { createBannerView } from '../../BannerView.js';

describe('BannerView', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    test('should render banner correctly', () => {
        const banners = [
            { title: 'Welcome', subtitle: 'Enjoy our platform', link: 'https://example.com', image: 'image1.jpg' },
            { title: 'Sale', subtitle: '50% off', link: 'https://example.com/sale', image: 'image2.jpg' }
        ];

        const view = createBannerView(container);
        const bannerViews = view.renderBanner(banners);

        expect(container.querySelector('.banner-container')).not.toBeNull();
        expect(bannerViews.bannerTitle).not.toBeNull();
        expect(bannerViews.bannerSubtitle).not.toBeNull();
        expect(container.querySelectorAll('.dot').length).toBe(2);
    });

    test('should update banner content', () => {
        const bannerData = { title: 'Updated Title', subtitle: 'Updated Subtitle', link: 'https://example.com/updated', image: 'updated-image.jpg' };
        const view = createBannerView(container);
        const bannerViews = view.renderBanner([bannerData]);

        view.updateBanner(bannerData, bannerViews);

        expect(bannerViews.bannerTitle.textContent).toBe('Updated Title');
        expect(bannerViews.bannerSubtitle.textContent).toBe('Updated Subtitle');
        expect(container.style.backgroundImage).toContain('updated-image.jpg');
    });
});
