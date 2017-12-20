import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function productReducer(state = initialState.products, action) {
  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products
    case types.CREATE_PRODUCT_SUCCESS:
      browserHistory.push(`/products/${action.product.id}`)
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.DELETE_PRODUCT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfCatToDelete = state.findIndex(product => {return product.id == action.product.id})
      newState.splice(indexOfCatToDelete, 1);
      browserHistory.push('/products');
      return newState;
    }
    default: 
      return state;
  }
}
