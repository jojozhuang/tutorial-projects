import HttpHelper from './HttpHelper'

class ProductsApi {
    static requestHeaders() {
      return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    static getAllProducts() {
        /*
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw(error);
        });*/
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'GET');
    }

    static getProduct(id) {
        /*
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products/${id}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw(error);
        });*/
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${id}`, 'GET');
    }

    static createProduct(product) {
        /*
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(product)
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw(error);
        });*/
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/`, 'POST', true, JSON.stringify(product));
    }

    static updateProduct(product) {
        /*
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products/${product.id}`, {
            method: 'PUT',
            headers: headers, 
            body: JSON.stringify(product)
        });
        return fetch(request).then(response => {
            console.log(response);
            return response.json();
        }).catch(error => {
            throw(error);
        });*/
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${product.id}`, 'PUT', true, JSON.stringify(product));
    }
    
    static deleteProduct(product) {
        /*
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        //const request = new Request(`${process.env.API_HOST}/api/products/${product.id}`, {
            const request = new Request(`${process.env.API_HOST}/api/products/10000`, {
            method: 'DELETE', 
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            throw(error);
        });*/
        return HttpHelper.fetch(`${process.env.API_HOST}/api/products/${product.id}`, 'DELETE', true);
    }
}

export default ProductsApi;