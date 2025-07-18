import { clearErrors, displayErrors } from '../../FormValidator.js';

describe('Error Handlers', () => {
    let divElement;

    beforeEach(() => {
        // Set up a mock DOM structure
        document.body.innerHTML = `
            <div id="test-div">
                <div id="error-message" style="display: none;"></div>
                <input id="input1" class="error" />
                <input id="input2" class="error" />
            </div>
        `;
        divElement = document.getElementById('test-div');
    });

    describe('clearErrors', () => {
        it('clears existing error messages', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');
            errorMessageDiv.innerHTML = '<p>Some error</p>';
            errorMessageDiv.style.display = 'block';

            clearErrors(divElement);

            expect(errorMessageDiv.innerHTML).toBe('');
            expect(errorMessageDiv.style.display).toBe('none');
        });

        it('removes the error class from inputs', () => {
            const inputs = divElement.querySelectorAll('input');

            clearErrors(divElement);

            inputs.forEach(input => {
                expect(input.classList.contains('error')).toBe(false);
            });
        });

        it('handles an empty #error-message gracefully', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');

            clearErrors(divElement);

            expect(errorMessageDiv.innerHTML).toBe('');
            expect(errorMessageDiv.style.display).toBe('none');
        });
    });

    describe('displayErrors', () => {
        it('displays a single error message', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');
            const errors = ['Error 1'];

            displayErrors(errors, divElement);

            expect(errorMessageDiv.innerHTML).toContain('<p>Error 1</p>');
            expect(errorMessageDiv.style.display).toBe('block');
        });

        it('displays multiple error messages', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');
            const errors = ['Error 1', 'Error 2'];

            displayErrors(errors, divElement);

            expect(errorMessageDiv.innerHTML).toContain('<p>Error 1</p>');
            expect(errorMessageDiv.innerHTML).toContain('<p>Error 2</p>');
            expect(errorMessageDiv.style.display).toBe('block');
        });

        it('handles an empty errors array', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');
            const errors = [];

            displayErrors(errors, divElement);

            expect(errorMessageDiv.innerHTML).toBe('');
            expect(errorMessageDiv.style.display).toBe('block');
        });

        it('appends errors without overwriting existing content', () => {
            const errorMessageDiv = divElement.querySelector('#error-message');
            errorMessageDiv.innerHTML = '<p>Existing error</p>';
            const errors = ['New Error'];

            displayErrors(errors, divElement);

            expect(errorMessageDiv.innerHTML).toContain('<p>Existing error</p>');
            expect(errorMessageDiv.innerHTML).toContain('<p>New Error</p>');
        });
    });
});