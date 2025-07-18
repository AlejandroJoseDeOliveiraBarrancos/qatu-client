import { createBannerViewModel } from '../../BannerViewModel.js';

describe('BannerViewModel', () => {
    let mockModel;
    let mockView;
    let bannerViews;

    beforeEach(() => {
        mockModel = [
            { title: 'Banner 1', subtitle: 'Subtitle 1', link: 'https://example.com/1', image: 'image1.jpg' },
            { title: 'Banner 2', subtitle: 'Subtitle 2', link: 'https://example.com/2', image: 'image2.jpg' }
        ];

        bannerViews = {
            bannerTitle: document.createElement('h1'),
            bannerSubtitle: document.createElement('p'),
            bannerLink: document.createElement('div'),
            navDots: document.createElement('div'),
            prevButton: document.createElement('button'),
            nextButton: document.createElement('button')
        };

        bannerViews.navDots.appendChild(document.createElement('span'));
        bannerViews.navDots.appendChild(document.createElement('span'));

        mockView = {
            renderBanner: jest.fn(() => bannerViews),
            updateBanner: jest.fn()
        };
    });

    test('should initialize the banner and render it correctly', () => {
        const viewModel = createBannerViewModel(mockModel, mockView);

        viewModel.initializeBanner();

        expect(mockView.renderBanner).toHaveBeenCalledWith(mockModel);
        expect(mockView.renderBanner).toHaveBeenCalledTimes(1);

        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[0], bannerViews);
    });

    test('should update to the next banner when next button is clicked', () => {
        const viewModel = createBannerViewModel(mockModel, mockView);

        viewModel.initializeBanner();

        bannerViews.nextButton.onclick();

        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[1], bannerViews);
    });

    test('should update to the previous banner when previous button is clicked', () => {
        const viewModel = createBannerViewModel(mockModel, mockView);

        viewModel.initializeBanner();

        bannerViews.prevButton.onclick();

        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[mockModel.length - 1], bannerViews);
    });

    test('should go to a specific banner when a nav dot is clicked', () => {
        const viewModel = createBannerViewModel(mockModel, mockView);

        viewModel.initializeBanner();

        bannerViews.navDots.childNodes[1].onclick();

        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[1], bannerViews);
    });

    test('should start auto-sliding banners', () => {
        jest.useFakeTimers();
        const viewModel = createBannerViewModel(mockModel, mockView);

        viewModel.initializeBanner();

        jest.advanceTimersByTime(5000);

        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[1], bannerViews);

        jest.advanceTimersByTime(5000);
        expect(mockView.updateBanner).toHaveBeenCalledWith(mockModel[0], bannerViews);

        jest.useRealTimers();
    });
});
