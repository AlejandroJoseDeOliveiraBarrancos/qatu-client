const SearchBarView = (container) => {

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'search');
    searchInput.setAttribute('placeholder', 'Buscar...');
    container.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'search-button');
    searchButton.textContent = 'Buscar';
    container.appendChild(searchButton);

    const resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('id', 'search-results');
    resultsContainer.style.display = 'none'; 
    const resultsList = document.createElement('ul');
    resultsContainer.appendChild(resultsList);
    container.appendChild(resultsContainer);

    const noResults = document.createElement('div');
    noResults.setAttribute('id', 'no-results');
    noResults.textContent = 'No se encontraron resultados.';
    noResults.style.display = 'none';
    container.appendChild(noResults);

    searchInput.addEventListener('focus', () => {
        resultsContainer.style.display = 'block';
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            resultsContainer.style.display = 'none';
        }, 200); 
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            resultsContainer.style.display = 'none';
        }
    });

    const bindSearch = (handler) => {
        searchButton.addEventListener('click', handler);
        searchInput.addEventListener('input', handler);
    };

    const bindResultClick = (handler) => {
        resultsList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                handler(event.target.textContent); 
            }
        });
    };

    const updateResults = (items) => {
        resultsList.innerHTML = '';

        if (items.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                resultsList.appendChild(li);
            });
        }
    };

    const setSearchTerm = (term) => {
        searchInput.value = term; 
    };

    const clearResults = () => {
        resultsList.innerHTML = ''; 
    };

    return {
        bindSearch,
        bindResultClick,
        updateResults,
        setSearchTerm,
        clearResults,
        getSearchTerm: () => searchInput.value 
    };
};

export default SearchBarView;
