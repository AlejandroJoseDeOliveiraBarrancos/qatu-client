import view from "../views/Login.html";
import "../assets/styles/LoginSignup.css";
import { createRequestManager } from "../services/RequestManager.js";
import { clearErrors, displayErrors } from "../services/FormValidator.js";
import { fetchMyUserDetails } from "../services/UserService.js";

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const form = divElement.querySelector('#login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearErrors(divElement);

        const email = divElement.querySelector('#email').value.trim();
        const password = divElement.querySelector('#password').value.trim();

        const { default: ValidationService } = await import('../services/ValidationService.js');
        const validationService = new ValidationService();
        const errors = validationService.validateLogin(email, password);

        if (errors.length) {
            displayErrors(errors, divElement);
        } else {
            try {
                const response = await requestManager.post('/auth/login', {
                    body: JSON.stringify({ usernameOrEmail: email, password })
                });
                localStorage.setItem("accessToken", response.accessToken);
                
                // Store email and password for OTP resend functionality
                localStorage.setItem("lastLoginEmail", email);
                localStorage.setItem("lastLoginPassword", password);
                
                window.location.hash = "#/otp_validation";
            } catch (error) {
                displayErrors([`Login failed: ${error.statusText}`], divElement);
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
            displayErrors([`Google Login failed: ${error.message}`], divElement);
        }
    });

    return divElement;
};