import view from "../views/OTPValidation.html";
import "../assets/styles/OtpValidation.css";
import { createRequestManager } from "../services/RequestManager.js";
import { clearErrors, displayErrors } from "../services/FormValidator.js";

const requestManager = createRequestManager({ baseUrl: process.env.API_BASE_URL });

const validateOtp = async (divElement) => {
    clearErrors(divElement);

    const otpInput = divElement.querySelector('#otpInput').value.trim();
    if (!otpInput || otpInput.length !== 6) {
        displayErrors(["OTP code must be 6 digits."], divElement);
        return false;
    }

    try {
        const response = await requestManager.post('/auth/validate-otp', {
            body: JSON.stringify({ otpCode: otpInput }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        localStorage.setItem("refreshToken", response.refreshToken);
        
        // Redirect to the Market view after Google login
        window.location.hash = "#/market-view";
        return true;
    } catch (error) {
        displayErrors([`OTP validation failed: ${error.statusText}`], divElement);
        return false;
    }
};

const resendOtp = async (divElement) => {
    try {
        const email = localStorage.getItem("lastLoginEmail");
        const password = localStorage.getItem("lastLoginPassword");

        if (!email || !password) {
            displayErrors(["Unable to resend OTP: Missing login credentials."], divElement);
            return;
        }
        
        const response = await requestManager.post('/auth/login', {
          body: JSON.stringify({ usernameOrEmail: email, password })
        });

        localStorage.setItem("authToken", response.token);
        displayErrors(["OTP has been resent. Please check your email."], divElement);
    } catch (error) {
        displayErrors([`Failed to resend OTP: ${error.statusText}`], divElement);
    }
};

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const form = divElement.querySelector('#otp-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateOtp(divElement);
    });

    divElement.querySelector('a[href="#/resend_otp"]').addEventListener('click', (event) => {
        event.preventDefault();
        resendOtp(divElement);
    });

    return divElement;
};