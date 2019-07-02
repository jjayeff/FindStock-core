import StockProvider from '../../resources/stock_provider';
const stockService = new StockProvider();

const state = {
  stock: [],
  single: [],
  sector: [],
  loading: true
};

const getters = {
  allStocks: state => state.stock,
  singleStock: state => state.single,
  allSectors: state => state.sector,
  stockLoading: state => state.loading
};

const actions = {
  async fetchStock({ commit }) {
    this.loading = true;
    const res = await stockService.getUser();
    commit('SET_STOCK', res);
  },
  async fetchFastStock({ commit }) {
    this.loading = true;
    const res = await stockService.getUserByPath(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-120-221.ap-southeast-2.compute.amazonaws.com:3000/api/stockfast'
    );
    commit('SET_STOCK', res);
  },
  async fetchSingleStock({ commit }, symbol) {
    this.loading = true;
    const res = await stockService.getUserByPath(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-120-221.ap-southeast-2.compute.amazonaws.com:3000/api/stock/' +
        symbol
    );
    commit('SET_SINGLE_STOCK', res);
  },
  async fetchSector({ commit }, sector) {
    this.loading = true;
    const res = await stockService.getUserByPath(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-120-221.ap-southeast-2.compute.amazonaws.com:3000/api/sector/' +
        sector
    );
    commit('SET_SECTOR', res);
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
  },
  SET_SECTOR(state, data) {
    state.sector = data;
    state.loading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
