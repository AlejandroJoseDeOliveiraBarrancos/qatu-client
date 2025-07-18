class ValidationService {
    constructor(existingUsernames = []) {
        // Temporary existing user list, primarily for the signup form
        this.existingUsernames = existingUsernames; 
    }

    validateCredentials(username, email, password, confirmPassword) {
        const errors = [];

        if (!username) {
            errors.push('Please fill in your username.');
        } else if (this.existingUsernames.includes(username)) {
            errors.push('Username already exists.');
        }

        if (!email) {
            errors.push('Please fill in your email.');
        }

        if (!password) {
            errors.push('Please fill in your password.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        return errors;
    }

    validateLogin(email, password) {
        const errors = [];

        if (!email) {
            errors.push('Please fill in your email.');
        } else {
            // Optional: You could add more email validation here (e.g., format check)
        }

        if (!password) {
            errors.push('Please fill in your password.');
        }

        return errors;
    }
}

export default ValidationService;
