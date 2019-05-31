import StockProvider from '../../resources/stock_provider';
const stockService = new StockProvider()

const state = {
    stock: [],
    loading: true
};

const getters = {
    allStocks: (state) => state.stock,
    stockLoading: (state) => state.loading,
};

const actions = {
    async fetchStock({commit}) {
        this.loading = true;
        const res = await stockService.getUser();
        commit('SET_STOCK', res);
    },
    async fetchStockFast({commit}) {
        this.loading = true;
        const res = await stockService.getUserByPath('https://cors-anywhere.herokuapp.com/http://findstockapi.cloudapp.net/api/stockfast');
        commit('SET_STOCK', res);
    }
};

const mutations = {
    SET_STOCK (state, data) {
        state.stock = data;
        state.loading = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};