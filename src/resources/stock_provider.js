import HttpRequest from './http_request';

class StockProvider extends HttpRequest {
  constructor() {
    // api api
    super(
      'https://cors-anywhere.herokuapp.com/http://ec2-54-206-110-80.ap-southeast-2.compute.amazonaws.com:4001/api/stock'
    );
  }

  async getUser() {
    const { data } = await this.get();
    return data;
  }

  async getUserByPath(path) {
    const { data } = await this.request('GET', path);
    return data;
  }

  async postVisitor(path, data) {
    const { result } = await this.request('POST', path, data);
    return result;
  }
}

export default StockProvider;
