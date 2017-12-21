import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {createHashHistory} from 'history';

export default function productReducer(state = initialState.products, action) {
  const history = createHashHistory()

  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products
    case types.CREATE_PRODUCT_SUCCESS:
      //history.push(`/products/${action.product.id}`)
      history.push('/products');
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.UPDATE_PRODUCT_SUCCESS:
      history.push('/products');
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ]
    case types.DELETE_PRODUCT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexToDelete = state.findIndex(product => {return product.id == action.product.id})
      newState.splice(indexToDelete, 1);
      history.push('/products');
      return newState;
    }
    default: 
      return state;
  }
}
