import UserManagement from "../UserManagement";
import UserManagementViewModel from "../UserManagementViewModel";
import view from "../views/UserManagement.html";

jest.mock("../UserManagementViewModel", () => {
    return jest.fn().mockImplementation(() => ({
        loadUsers: jest.fn().mockResolvedValue(),
        renderUsers: jest.fn(),
        addUser: jest.fn(),
        filterUsers: jest.fn(),
    }));
});

jest.mock("../../views/UserManagement.html", () => `
    <div>
        <button id="btn-add-user"></button>
        <input id="filter-input" />
        <table id="user-list"></table>
    </div>
`);

describe("UserManagement", () => {
    let divElement;
    let viewModelMock;

    beforeEach(() => {
        UserManagementViewModel.mockClear();
        divElement = UserManagement();
        viewModelMock = UserManagementViewModel.mock.instances[0];
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it("should render the view correctly", () => {
        expect(divElement.innerHTML).toContain("id=\"btn-add-user\"");
        expect(divElement.innerHTML).toContain("id=\"filter-input\"");
        expect(divElement.innerHTML).toContain("id=\"user-list\"");
    });

});
