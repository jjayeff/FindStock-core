import StockProvider from '../../resources/stock_provider';
const stockService = new StockProvider();

const state = {
  stock: [],
  single: [],
  loading: true
};

const getters = {
  allStocks: state => state.stock,
  SingleStock: state => state.single,
  stockLoading: state => state.loading
};

const actions = {
  async fetchStock({ commit }) {
    this.loading = true;
    const res = await stockService.getUser();
    commit('SET_STOCK', res);
  },
  async fetchStockFast({ commit }) {
    this.loading = true;
    const res = await stockService.getUserByPath(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-110-80.ap-southeast-2.compute.amazonaws.com:4001/api/stockfast'
    );
    commit('SET_STOCK', res);
  },
  async fetchSingleStock({ commit }, symbol) {
    this.loading = true;
    const res = await stockService.getUserByPath(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-110-80.ap-southeast-2.compute.amazonaws.com:4001/api/stock/' +
        symbol
    );
    commit('SET_SINGLE_STOCK', res);
  }
};

const mutations = {
  SET_STOCK(state, data) {
    state.stock = data;
    state.loading = false;
  },
  SET_SINGLE_STOCK(state, data) {
    state.single = data;
    state.loading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
