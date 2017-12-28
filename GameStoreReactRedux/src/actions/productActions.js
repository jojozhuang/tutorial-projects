import * as types from './actionTypes';
import productApi from '../api/ProductApi';
import history from '../history.js';

export function loadProductsSuccess(products) {
  return {type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(product) {
  return {type: types.CREATE_PRODUCT_SUCCESS, product};
}
  
export function updateProductSuccess(product) {
  return {type: types.UPDATE_PRODUCT_SUCCESS, product};
}

export function deleteProductSuccess(product) {
  return {type: types.DELETE_PRODUCT_SUCCESS, product};
}

export function fetchResoucesFail(error) {
  return {type: types.FETCH_RESOURCES_FAIL, error};
}

export function loadProducts() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return productApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {products: []})));
    });
  };
}

export function createProduct(product) {
  return function (dispatch) {
    return productApi.createProduct(product).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(createProductSuccess(response));
      history.push('/products');
      return response;
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}

export function updateProduct(product) {
  return function (dispatch) {
    return productApi.updateProduct(product).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(updateProductSuccess(response));
      history.push('/products');
      return(response);
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}

export function deleteProduct(product, products) {
  return function(dispatch) {
    return productApi.deleteProduct(product).then(() => {
      //console.log(`Deleted ${product.id}`)
      dispatch(deleteProductSuccess(product));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {products: products})));
    });
  };
}