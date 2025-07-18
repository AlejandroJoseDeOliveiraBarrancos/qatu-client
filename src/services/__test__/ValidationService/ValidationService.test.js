import ValidationService from '../../ValidationService.js';

describe('ValidationService', () => {
    let validationService;

    beforeEach(() => {
        validationService = new ValidationService(['existingUser']);
    });

    describe('validateCredentials', () => {
        it('should return no errors for valid inputs', () => {
            const errors = validationService.validateCredentials(
                'newUser',
                'email@example.com',
                'password123',
                'password123'
            );
            expect(errors).toEqual([]);
        });

        it('should return error for missing username', () => {
            const errors = validationService.validateCredentials(
                '',
                'email@example.com',
                'password123',
                'password123'
            );
            expect(errors).toContain('Please fill in your username.');
        });

        it('should return error for existing username', () => {
            const errors = validationService.validateCredentials(
                'existingUser',
                'email@example.com',
                'password123',
                'password123'
            );
            expect(errors).toContain('Username already exists.');
        });

        it('should return error for missing email', () => {
            const errors = validationService.validateCredentials(
                'newUser',
                '',
                'password123',
                'password123'
            );
            expect(errors).toContain('Please fill in your email.');
        });

        it('should return error for missing password', () => {
            const errors = validationService.validateCredentials(
                'newUser',
                'email@example.com',
                '',
                'password123'
            );
            expect(errors).toContain('Please fill in your password.');
        });

        it('should return error for mismatched passwords', () => {
            const errors = validationService.validateCredentials(
                'newUser',
                'email@example.com',
                'password123',
                'password456'
            );
            expect(errors).toContain('Passwords do not match.');
        });

        it('should return multiple errors for multiple issues', () => {
            const errors = validationService.validateCredentials(
                '',
                '',
                '',
                'password456'
            );
            expect(errors).toEqual([
                'Please fill in your username.',
                'Please fill in your email.',
                'Please fill in your password.',
                'Passwords do not match.'
            ]);
        });
    });

    describe('validateLogin', () => {
        it('should return no errors for valid inputs', () => {
            const errors = validationService.validateLogin(
                'email@example.com',
                'password123'
            );
            expect(errors).toEqual([]);
        });

        it('should return error for missing email', () => {
            const errors = validationService.validateLogin(
                '',
                'password123'
            );
            expect(errors).toContain('Please fill in your email.');
        });

        it('should return error for missing password', () => {
            const errors = validationService.validateLogin(
                'email@example.com',
                ''
            );
            expect(errors).toContain('Please fill in your password.');
        });

        it('should return multiple errors for missing email and password', () => {
            const errors = validationService.validateLogin('', '');
            expect(errors).toEqual([
                'Please fill in your email.',
                'Please fill in your password.'
            ]);
        });
    });
});
