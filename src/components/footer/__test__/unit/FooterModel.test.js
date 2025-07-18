import { createFooterModel } from '../../FooterModel.js';

describe('FooterModel', () => {
    test('should create a valid footer model', () => {
        const sections = [
            {
                title: 'Follow Us',
                links: [
                    { name: 'X', url: 'https://twitter.com' },
                    { name: 'Instagram', url: 'https://instagram.com' }
                ]
            }
        ];

        const model = createFooterModel(sections);
        expect(model).toEqual({ sections });
    });

    test('should throw an error for invalid sections structure', () => {
        expect(() => createFooterModel('Invalid structure')).toThrow('Sections must be an array of objects with title and links array.');
        expect(() => createFooterModel([{ title: 'Invalid', links: 'Not an array' }])).toThrow('Sections must be an array of objects with title and links array.');
        expect(() => createFooterModel([{ title: '', links: [] }])).toThrow('Sections must be an array of objects with title and links array.');
    });
});
