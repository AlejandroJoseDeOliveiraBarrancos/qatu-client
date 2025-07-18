import { createFooterModel } from '../../FooterModel.js';
import { createFooterView } from '../../FooterView.js';
import { createFooterViewModel } from '../../FooterViewModel.js';

describe('Footer Integration', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should initialize footer view model and render footer correctly', () => {
        const sections = [
            {
                title: 'Stay Connected',
                links: [
                    { name: 'Instagram', url: 'https://instagram.com' },
                    { name: 'YouTube', url: 'https://youtube.com' }
                ]
            }
        ];

        const model = createFooterModel(sections);
        const view = createFooterView(container);
        const viewModel = createFooterViewModel(model, view);

        viewModel.initialize();

        expect(container.querySelector('footer')).not.toBeNull();
        expect(container.querySelector('h5').textContent).toBe('Stay Connected');
        expect(container.querySelectorAll('.social-icons a').length).toBe(2);
        expect(container.querySelector('.social-icons a[href="https://instagram.com"] i').className).toBe('fab fa-instagram');
    });
});
