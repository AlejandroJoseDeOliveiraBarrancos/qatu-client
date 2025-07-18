export const clearErrors = (divElement) => {
    const errorMessageDiv = divElement.querySelector('#error-message');
    errorMessageDiv.innerHTML = '';
    errorMessageDiv.style.display = 'none';
    divElement.querySelectorAll('input').forEach(input => input.classList.remove('error'));
};

export const displayErrors = (errors, divElement) => {
    const errorMessageDiv = divElement.querySelector('#error-message');
    errors.forEach(error => {
        errorMessageDiv.innerHTML += `<p>${error}</p>`;
    });
    errorMessageDiv.style.display = 'block';
};