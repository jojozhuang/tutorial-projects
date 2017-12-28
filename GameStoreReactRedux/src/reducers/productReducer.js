import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function productsReducer(state = initialState.products, action) {
  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.CREATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ];
    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ];
    case types.DELETE_PRODUCT_SUCCESS: {
      const newProducts = Object.assign([], state);
      const indexToDelete = state.findIndex(product => {return product.id == action.product.id;});
      newProducts.splice(indexToDelete, 1);
      return newProducts;
    }
    default: 
      return state;
  }
}
