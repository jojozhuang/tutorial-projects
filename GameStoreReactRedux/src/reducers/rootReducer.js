import {combineReducers} from 'redux';  
import products from './productReducer';
import file from './fileReducer';

const rootReducer = combineReducers({  
  products,
  file
})

export default rootReducer; 