import { createFooterViewModel } from '../../FooterViewModel.js';

describe('FooterViewModel', () => {
    let mockModel;
    let mockView;

    beforeEach(() => {
        mockModel = {
            sections: [
                {
                    title: 'Contact Us',
                    links: [
                        { name: 'LinkedIn', url: 'https://linkedin.com' },
                        { name: 'YouTube', url: 'https://youtube.com' }
                    ]
                }
            ]
        };

        mockView = {
            renderFooter: jest.fn()
        };
    });

    test('should initialize the view and render the footer', () => {
        const viewModel = createFooterViewModel(mockModel, mockView);

        viewModel.initialize();

        expect(mockView.renderFooter).toHaveBeenCalledWith(mockModel);
        expect(mockView.renderFooter).toHaveBeenCalledTimes(1);
    });
});
