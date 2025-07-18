import view from "../views/ForgotPassword.html";
import "../assets/styles/ForgotPassword.css"; 

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
  return emailRegex.test(email);
};

const handleEmailSubmission = (divElement) => {
  const errorMessageDiv = divElement.querySelector('#error-message');
  errorMessageDiv.innerHTML = '';
  const emailInput = divElement.querySelector('#emailInput');
  emailInput.classList.remove('error');

  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    console.log('Sending reset link to:', email);
    alert('Reset link sent to ' + email);
    emailInput.value = ''; // Clear the input after submission
  } else {
    errorMessageDiv.innerHTML = '<p>Please enter a valid email address.</p>';
    emailInput.classList.add('error');
  }
};

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const form = divElement.querySelector('#email-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    handleEmailSubmission(divElement);
  });

  return divElement;
};
