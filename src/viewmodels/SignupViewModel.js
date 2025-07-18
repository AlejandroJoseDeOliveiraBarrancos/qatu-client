import view from "../views/Signup.html";
import "../assets/styles/LoginSignup.css";
import { createRequestManager } from "../services/RequestManager.js";
import { clearErrors, displayErrors } from '../services/FormValidator.js';

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const form = divElement.querySelector('#signup-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearErrors(divElement);

        const username = divElement.querySelector('#username').value.trim();
        const email = divElement.querySelector('#email').value.trim();
        const password = divElement.querySelector('#password').value.trim();
        const confirmPassword = divElement.querySelector('#confirm-password').value.trim();

        const { default: ValidationService } = await import('../services/ValidationService.js');
        const validationService = new ValidationService(['user1', 'user2']);
        const errors = validationService.validateCredentials(username, email, password, confirmPassword);

        if (errors.length) {
            displayErrors(errors, divElement);
        } else {
            try {
                const response = await requestManager.post('/Users', {
                    body: JSON.stringify({ username, email, password })
                });
                localStorage.setItem("accessToken", response.accessToken);
                window.location.hash = "#/otp_validation";
            } catch (error) {
                displayErrors([`Signup failed: ${error.statusText}`], divElement);
            }
        }
    });

    divElement.querySelector('#btn-google').addEventListener('click', async (event) => {
        event.preventDefault();
        const { loginWithGoogle } = await import("../services/FirebaseService.js");
        try {
            const userDetails = await loginWithGoogle();
            const response = await requestManager.post('/auth/firebase-login', {
                body: JSON.stringify(userDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem("refreshToken", response.refreshToken);
            window.location.hash = "#/market-view";
        } catch (error) {
            displayErrors([`Google Sign-up failed: ${error.message}`], divElement);
        }
    });

    return divElement;
};