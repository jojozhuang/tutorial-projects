import * as types from './actionTypes';
import productApi from '../api/ProductsApi';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export function loadProductsSuccess(products) {
  return {type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(product) {
  return {type: types.CREATE_PRODUCT_SUCCESS, product}
}
  
export function updateProductSuccess(product) {
  return {type: types.UPDATE_PRODUCT_SUCCESS, product}
}

export function deleteProductSuccess(product) {
  return {type: types.DELETE_PRODUCT_SUCCESS, product}
}

export function loadProducts() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return productApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createProduct(product) {
  return function (dispatch) {
    return productApi.createProduct(product).then(response => {
      dispatch(createProductSuccess(response));
      history.push('/products');
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateProduct(product) {
  return function (dispatch) {
    return productApi.updateProduct(product).then(response => {
      dispatch(updateProductSuccess(response));
      console.log('action-updateProduct');
      this.props.history.push('/')
      history.push('/');
      console.log(history);
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteProduct(product) {
  return function(dispatch) {
    return productApi.deleteProduct(product).then(() => {
      console.log(`Deleted ${product.id}`)
      dispatch(deleteProductSuccess(product));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}