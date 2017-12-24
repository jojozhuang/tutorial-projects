import {combineReducers} from 'redux';  
import products from './productsReducer';
import file from './fileReducer';
import { routerReducer as routing} from 'react-router-redux'

const rootReducer = combineReducers({  
  // short hand property names
  products,
  file,
  routing
})

export default rootReducer; 