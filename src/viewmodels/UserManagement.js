import view from "../views/UserManagement.html";
import "../assets/styles/UserManagement.css";
import UserManagementViewModel from "./UserManagementViewModel.js";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const viewModel = new UserManagementViewModel();

  viewModel.loadUsers().then(() => {
    viewModel.renderUsers(divElement.querySelector("#user-list"));
  });

  const addUserButton = divElement.querySelector("#btn-add-user");
  addUserButton.addEventListener("click", () => viewModel.addUser());

  const filterInput = divElement.querySelector("#filter-input");
  filterInput.addEventListener("input", (event) => {
    viewModel.filterUsers(event.target.value);
    viewModel.renderUsers(divElement.querySelector("#user-list"));
  });

  return divElement;
};
