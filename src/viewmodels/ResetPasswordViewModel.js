import view from "../views/ResetPassword.html";
import "../assets/styles/ResetPassword.css";


export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const form = divElement.querySelector('#password-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    //hanlde password reset
    console.log("Password has been updated");
  });

  return divElement;
};
