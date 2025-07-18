const SearchBarViewModel = (model, view) => {
    let searchTerm = ''; 
    const handleSearch = () => {
        searchTerm = model.setSearchTerm(view.getSearchTerm());
        const filteredItems = model.getFilteredItems(searchTerm);
        view.updateResults(filteredItems);
    };

    const handleResultClick = (item) => {
        view.setSearchTerm(item); 
        view.clearResults(); 
    };

    const initialize = () => {
        view.updateResults(model.getFilteredItems('')); 
        view.bindResultClick(handleResultClick); 
    };

    view.bindSearch(handleSearch);

    return {
        initialize
    };
};

export default SearchBarViewModel;
