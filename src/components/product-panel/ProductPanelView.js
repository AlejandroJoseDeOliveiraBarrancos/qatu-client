
export const createPanelView = (container, filterContainer) => {

    const criteriaFilter = document.createElement('select');
    criteriaFilter.id = 'category-filter';
    criteriaFilter.innerHTML = `
        <option value="">Todas las categorías</option>

    `;

    const priceFilter = document.createElement('select');
    priceFilter.id = 'price-filter';
    priceFilter.innerHTML = `
        <option value="">Todos los precios</option>
        <option value="0-50">0 - 50</option>
        <option value="51-100">51 - 100</option>
        <option value="101-200">101 - 200</option>
        <option value="200+">200+</option>
    `;

    const sortMenu = document.createElement('select');
    sortMenu.id = 'sort-menu';
    sortMenu.innerHTML = `
        <option value="">Ordenar por</option>
    `;

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    const prevButton = document.createElement('button');
    prevButton.id = 'prev-page';
    prevButton.textContent = 'Anterior';
    const nextButton = document.createElement('button');
    nextButton.id = 'next-page';
    nextButton.textContent = 'Siguiente';

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);


    filterContainer.appendChild(criteriaFilter);
    filterContainer.appendChild(priceFilter);
    filterContainer.appendChild(sortMenu);
    filterContainer.appendChild(paginationContainer);


    const productCardsContainer = document.createElement('div');
    productCardsContainer.className = 'product-cards-container';
    container.appendChild(productCardsContainer);

    const renderPanel = (models) => {

        productCardsContainer.innerHTML = '';

 
        return models.map(() => {
            const containerCard = document.createElement('div');
            containerCard.className = 'card-container';
            productCardsContainer.appendChild(containerCard);
            return containerCard; 
        });
    };

    return {
        renderPanel,
        getCriteriaFilter: () => criteriaFilter,
        getPriceFilter: () => priceFilter,
        getSortMenu: () => sortMenu,
        getPrevButton: () => prevButton,
        getNextButton: () => nextButton
    };
};
