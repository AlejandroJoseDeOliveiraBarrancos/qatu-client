import SearchBarModel from "../../SearchBarModel";

describe("SearchBarModel", () => {
    const mockItems = ["apple", "banana", "grape", "orange"];
    let model;

    beforeEach(() => {
        model = SearchBarModel(mockItems);
    });

    test("should return all items when searchTerm is empty", () => {
        const result = model.getFilteredItems("");
        expect(result).toEqual(mockItems);
    });

    test("should filter items based on search term", () => {
        const result = model.getFilteredItems("ap");
        expect(result).toEqual(["apple", "grape"]);
    });

    test("should return an empty array if no items match the search term", () => {
        const result = model.getFilteredItems("xyz");
        expect(result).toEqual([]);
    });
});
