import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { browserHistory } from 'react-router';

//const history = browserHistory()

export default function productsReducer(state = initialState.products, action) {
  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      //console.log(action.products)
      /*
      return Object.assign({}, state.products, {
        products: action.products
      })*/
      return action.products
    case types.CREATE_PRODUCT_SUCCESS:
      //history.push(`/products/${action.product.id}`)
      //history.push('/products');
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.UPDATE_PRODUCT_SUCCESS:
     //console.log(history);
      //browserHistory.push('/');
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.DELETE_PRODUCT_SUCCESS: {
      const newProducts = Object.assign([], state);
      const indexToDelete = state.findIndex(product => {return product.id == action.product.id})
      newProducts.splice(indexToDelete, 1);
      //history.push('/products');
      return newProducts;
    }
    case types.FETCH_RESOURCES_FAIL: {
      console.log('types.FETCH_RESOURCES_FAIL');
      console.log(state);
      console.log(action);
      //state = initialState;
      //state.error = action.error;
      //initialState.error = action.error;
      return Object.assign({}, state.error, {
        error: action.error
      })
      //return state;
    }
    default: 
      return state;
  }
}
