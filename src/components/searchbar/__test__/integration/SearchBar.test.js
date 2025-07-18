import SearchBarModel from "../../SearchBarModel";
import SearchBarView from "../../SearchBarView";
import SearchBarViewModel from "../../SearchBarViewModel";

describe("SearchBar Integration Tests", () => {
    let container, model, view, viewModel;
    const mockItems = ["apple", "banana", "grape", "orange", "apricot"];

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);

        model = SearchBarModel(mockItems);
        view = SearchBarView(container);
        viewModel = SearchBarViewModel(model, view);

        viewModel.initialize();
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    test("should render all items initially", () => {
        const resultsList = container.querySelector("#search-results ul").children;
        expect(resultsList.length).toBe(mockItems.length);
        expect(resultsList[0].textContent).toBe("apple");
        expect(resultsList[1].textContent).toBe("banana");
    });

    test("should filter items based on search input", () => {
        const searchInput = container.querySelector("#search");
        searchInput.value = "ap";

        const event = new Event("input");
        searchInput.dispatchEvent(event);

        const resultsList = container.querySelectorAll("#search-results ul li");
        expect(resultsList.length).toBe(3);
        expect(resultsList[0].textContent).toBe("apple");
        expect(resultsList[1].textContent).toBe("grape");
    });

    test("should show 'no results' message if no items match the search term", () => {
        const searchInput = container.querySelector("#search");
        searchInput.value = "xyz";

        const event = new Event("input");
        searchInput.dispatchEvent(event);

        const noResultsMessage = container.querySelector("#no-results");
        expect(noResultsMessage.style.display).toBe("block");

        const resultsList = container.querySelectorAll("#search-results ul li");
        expect(resultsList.length).toBe(0);
    });

    test("should update search term and clear results when clicking on an item", () => {
        const searchInput = container.querySelector("#search");
        searchInput.value = "ap";

        const inputEvent = new Event("input");
        searchInput.dispatchEvent(inputEvent);

        const resultsList = container.querySelector("#search-results ul");
        const firstResult = resultsList.firstChild;
        expect(firstResult.textContent).toBe("apple");

        firstResult.click();

        expect(searchInput.value).toBe("apple");
        expect(resultsList.children.length).toBe(0);
    });

    test("should display results container on search input focus", () => {
        const searchInput = container.querySelector("#search");
        const resultsContainer = container.querySelector("#search-results");

        searchInput.focus();
        expect(resultsContainer.style.display).toBe("block");
    });

    test("should hide results container on search input blur after a delay", (done) => {
        const searchInput = container.querySelector("#search");
        const resultsContainer = container.querySelector("#search-results");

        searchInput.blur();

        setTimeout(() => {
            expect(resultsContainer.style.display).toBe("none");
            done();
        }, 250);
    });

    test("should filter items using the Enter key", () => {
        const searchInput = container.querySelector("#search");
        const resultsContainer = container.querySelector("#search-results");

        searchInput.value = "ban";
        const keypressEvent = new KeyboardEvent("keypress", { key: "Enter" });
        searchInput.dispatchEvent(keypressEvent);

        expect(resultsContainer.style.display).toBe("none"); 
    });
});
