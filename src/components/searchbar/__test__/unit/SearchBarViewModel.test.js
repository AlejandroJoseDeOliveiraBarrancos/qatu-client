import SearchBarViewModel from "../../SearchBarViewModel";
import SearchBarModel from "../../SearchBarModel";
import SearchBarView from "../../SearchBarView";

describe("SearchBarViewModel", () => {
    let model, view, viewModel, container;

    beforeEach(() => {
        const mockItems = ["apple", "banana", "grape"];
        model = SearchBarModel(mockItems);

        container = document.createElement("div");
        view = SearchBarView(container);

        viewModel = SearchBarViewModel(model, view);
    });

    test("should initialize with all items visible", () => {
        const updateResultsSpy = jest.spyOn(view, "updateResults");

        viewModel.initialize();

        expect(updateResultsSpy).toHaveBeenCalledWith(model.getFilteredItems(""));
    });

    test("should update results based on search term", () => {
        const updateResultsSpy = jest.spyOn(view, "updateResults");

        const searchInput = container.querySelector("#search");
        searchInput.value = "ap";

        const event = new Event("input");
        searchInput.dispatchEvent(event);

        expect(updateResultsSpy).toHaveBeenCalledWith(["apple", "grape"]);
    });

    test("should handle result item click", () => {
        const setSearchTermSpy = jest.spyOn(view, "setSearchTerm");
        const clearResultsSpy = jest.spyOn(view, "clearResults");

        viewModel.initialize();
        const resultItemClickHandler = container.querySelector("#search-results ul");
        const resultItem = document.createElement("li");
        resultItem.textContent = "apple";
        resultItemClickHandler.appendChild(resultItem);

        resultItem.click();

        expect(setSearchTermSpy).toHaveBeenCalledWith("apple");
        expect(clearResultsSpy).toHaveBeenCalled();
    });
});
