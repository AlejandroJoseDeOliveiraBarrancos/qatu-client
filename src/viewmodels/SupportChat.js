import view from "../views/SupportChat.html";
import "../assets/styles/SupportChat.css";
import SupportChatViewModel from "./SupportChatViewModel.js";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const viewModel = new SupportChatViewModel();


  setTimeout(() => {
    viewModel.loadMessages();
  }, 0);
  viewModel.loadMessages();

  const sendButton = divElement.querySelector("#btn-send-message");
  const inputField = divElement.querySelector("#chat-input");

  sendButton.addEventListener("click", () => viewModel.sendMessage(divElement));
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      viewModel.sendMessage(divElement);
    }
  });

  return divElement;
};
