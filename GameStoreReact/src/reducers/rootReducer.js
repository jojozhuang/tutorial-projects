import {combineReducers} from 'redux';  
import products from './productReducer';

const rootReducer = combineReducers({  
  // short hand property names
  products
})

export default rootReducer; 