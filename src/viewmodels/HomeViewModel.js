import view from "../views/Home.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const accountButton = divElement.querySelector("#account");
    accountButton.addEventListener("click", () => {
        window.location.hash = "#/signup"; 
    });

    return divElement;
  };

