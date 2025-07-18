import { createCardViewModel } from "../card/CardViewModel.js";
import { fetchProducts } from "../../services/ProductService.js";
import { createCardView } from "../card/CardView.js";

export const createPanelViewModel = (model, view) => {
    let currentPage = 1;

    async function loadProducts(filter = '', criteria = '', order = 'asc', page = 1) {
        try {
            const data = await fetchProducts(page, 10, filter, criteria, order);
            const cardsItems = data.map(product => ({
                productId: product.productId,
                name: product.name || 'Sin título',
                description: product.description || 'Sin descripción',
                image:product.image,
                buttonText: 'Ver más',
                price: product.price,
                creationDate: new Date(product.creationDate) || new Date(),
                status: product.status,
                url: `#/product-view/${product.productId}`
            }));

            if (cardsItems.length === 0) {
                console.warn('No se encontraron productos.');
            } else {
                model.update(cardsItems); 
            }
            const containers = view.renderPanel(cardsItems);
            const viewModels = containers.map((container, index) => {
                const cardView = createCardView(container);
                return createCardViewModel(cardsItems[index], cardView); 
            });
            viewModels.forEach(viewModel => viewModel.initialize());
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    function createCardViewModels(views) {
        return model.getCardItems().map((item, index) => createCardViewModel(item, views[index]));
    }

    const searchProducts = async (filter) => {
        await loadProducts(filter, '', 'asc', 1);
    };

    const initializePanel = () => {
        loadProducts();

        const categoryFilter = view.getCriteriaFilter();
        const priceFilter = view.getPriceFilter();
        const sortMenu = view.getSortMenu();
        const prevButton = view.getPrevButton();
        const nextButton = view.getNextButton();

        categoryFilter.addEventListener('change', async () => {
            const selectedCategory = categoryFilter.value;
            const selectedPriceRange = priceFilter.value;
            const selectedSort = sortMenu.value;
            await loadProducts(selectedPriceRange, selectedCategory, selectedSort, currentPage);
        });

        priceFilter.addEventListener('change', async () => {

            const selectedCategory = "price";
            const selectedPriceRange = priceFilter.value ? convertPriceRange(priceFilter.value) : '';
            const selectedSort = sortMenu.value;
            await loadProducts(selectedPriceRange, selectedCategory, selectedSort, currentPage);

        });

        sortMenu.addEventListener('change', async () => {
            const selectedCategory = categoryFilter.value;
            const selectedPriceRange = priceFilter.value ? convertPriceRange(priceFilter.value) : '';
            const selectedSort = sortMenu.value;
            await loadProducts(selectedPriceRange, selectedCategory, selectedSort, currentPage);
        });

        prevButton.addEventListener('click', async () => {
            if (currentPage > 1) {
                currentPage -= 1;
                const selectedCategory = categoryFilter.value;
                const selectedPriceRange = priceFilter.value ? convertPriceRange(priceFilter.value) : '';
                const selectedSort = sortMenu.value;
                await loadProducts(selectedPriceRange, selectedCategory, selectedSort, currentPage);
            }
        });

        nextButton.addEventListener('click', async () => {
            currentPage += 1;
            const selectedCategory = categoryFilter.value;
            const selectedPriceRange = priceFilter.value ? convertPriceRange(priceFilter.value) : '';
            const selectedSort = sortMenu.value;
            await loadProducts(selectedPriceRange, selectedCategory, selectedSort, currentPage);
        });
    };

    const convertPriceRange = (value) => {
        switch (value) {
            case "0-50":
                return "0-50";
            case "51-100":
                return "51-100";
            case "101-200":
                return "101-200";
            case "200+":
                return "200-"; 
            default:
                return "";
        }
    };

    window.addEventListener('reloadProducts', () => {
         loadProducts();
    });

    return {
        initializePanel,
        searchProducts,
        convertPriceRange
    };
};
