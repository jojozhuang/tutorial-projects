import {combineReducers} from 'redux';  
import products from './productReducer';
import file from './fileReducer';

const rootReducer = combineReducers({  
  // short hand property names
  products,
  file
})

export default rootReducer; 