const SearchBarModel = (arrayItems) => {
    const items = arrayItems; 

    const setSearchTerm = (term) => term.toLowerCase();

    const getFilteredItems = (searchTerm) => {
        if (searchTerm === '') return items;
        return items.filter(item => item.toLowerCase().includes(searchTerm));
    };

    return {
        setSearchTerm,
        getFilteredItems
    };
};

export default SearchBarModel;
