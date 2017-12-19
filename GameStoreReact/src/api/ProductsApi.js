class ProductsApi {
    static requestHeaders() {
      return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    static getAllProducts() {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static updateProduct(product) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products/${product.id}`, {
            method: 'PUT',
            headers: headers, 
            body: JSON.stringify({product: product})
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static createProduct(product) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({product: product})
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteProduct(product) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request(`${process.env.API_HOST}/api/products/${product.id}`, {
            method: 'DELETE', 
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default ProductsApi;
    