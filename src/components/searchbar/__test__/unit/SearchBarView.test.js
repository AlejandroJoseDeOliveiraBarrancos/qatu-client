import SearchBarView from "../../SearchBarView";

describe("SearchBarView", () => {
    let container, view;

    beforeEach(() => {
        container = document.createElement("div");
        view = SearchBarView(container);
    });

    test("should initialize DOM elements", () => {
        expect(container.querySelector("#search")).not.toBeNull();
        expect(container.querySelector("#search-button")).not.toBeNull();
        expect(container.querySelector("#search-results")).not.toBeNull();
        expect(container.querySelector("#no-results")).not.toBeNull();
    });

    test("should bind search input and button events", () => {
        const mockHandler = jest.fn();
        view.bindSearch(mockHandler);

        const searchInput = container.querySelector("#search");
        const searchButton = container.querySelector("#search-button");

        searchInput.dispatchEvent(new Event("input"));
        searchButton.click();

        expect(mockHandler).toHaveBeenCalledTimes(2);
    });

    test("should update results with items", () => {
        const items = ["apple", "banana", "grape"];
        view.updateResults(items);

        const results = container.querySelectorAll("#search-results ul li");
        expect(results.length).toBe(items.length);
        expect(results[0].textContent).toBe("apple");
        expect(results[1].textContent).toBe("banana");
        expect(results[2].textContent).toBe("grape");
    });

    test("should show 'no results' message when no items are found", () => {
        view.updateResults([]);

        const noResults = container.querySelector("#no-results");
        expect(noResults.style.display).toBe("block");
    });

    test("should bind click events on result items", () => {
        const mockHandler = jest.fn();
        view.bindResultClick(mockHandler);

        const resultsList = container.querySelector("#search-results ul");
        const resultItem = document.createElement("li");
        resultItem.textContent = "apple";
        resultsList.appendChild(resultItem);

        resultItem.click();
        expect(mockHandler).toHaveBeenCalledWith("apple");
    });
});
