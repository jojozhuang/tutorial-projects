import HttpHelper from './HttpHelper';

class ProductsApi {
  static requestHeaders() {
    return {'Content-Type': 'application/json'};
  }

  static getAllProducts() {
    return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'GET', this.requestHeaders(), null);
  }

  static getProduct(id) {
    return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${id}`, 'GET', this.requestHeaders(), null);
  }

  static createProduct(product) {
    return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'POST', this.requestHeaders(), JSON.stringify(product));
  }

  static updateProduct(product) {
    return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${product.id}`, 'PUT', this.requestHeaders(), JSON.stringify(product));
  }
    
  static deleteProduct(product) {
    return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${product.id}`, 'DELETE', this.requestHeaders(), null);
  }
}

export default ProductsApi;