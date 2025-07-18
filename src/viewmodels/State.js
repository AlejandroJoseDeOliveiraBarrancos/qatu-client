// src/viewmodels/State.js
const initialState = {
    products: [],    
    user: null,    
    filters: {
        category: null,
        priceRange: null,
    },
    sortOrder: null, 
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
    }
};

const appState = {
    state: initialState,
    listeners: [],

    subscribe(listener) {
        this.listeners.push(listener);
    },

    update(newData) {
        this.state = { ...this.state, ...newData };
        this.listeners.forEach((listener) => listener(this.state));
    },

    getState() {
        return this.state;
    },
};

export default appState;
