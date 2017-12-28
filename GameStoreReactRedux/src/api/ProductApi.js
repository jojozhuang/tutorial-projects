import HttpHelper from './HttpHelper';

class ProductApi {
    static getAllProducts() {
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'GET', true, null);
    }

    static getProduct(id) {
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${id}`, 'GET', true, null);
    }

    static createProduct(product) {
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'POST', true, JSON.stringify(product));
    }

    static updateProduct(product) {
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${product.id}`, 'PUT', true, JSON.stringify(product));
    }
    
    static deleteProduct(product) {
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/99`, 'DELETE', true, null);
    }
}

export default ProductApi;