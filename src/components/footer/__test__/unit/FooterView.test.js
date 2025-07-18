import { createFooterView } from '../../FooterView.js';

describe('FooterView', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    test('should render footer correctly', () => {
        const model = {
            sections: [
                {
                    title: 'Connect with Us',
                    links: [
                        { name: 'X', url: 'https://twitter.com' },
                        { name: 'LinkedIn', url: 'https://linkedin.com' }
                    ]
                }
            ]
        };

        const view = createFooterView(container);
        view.renderFooter(model);

        expect(container.querySelector('footer')).not.toBeNull();
        expect(container.querySelector('h5').textContent).toBe('Connect with Us');
        expect(container.querySelectorAll('.social-icons a').length).toBe(2);
        expect(container.querySelector('.social-icons a[href="https://twitter.com"] i').className).toBe('fab fa-twitter');
    });
});
