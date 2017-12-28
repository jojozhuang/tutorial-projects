import React from 'react';  
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';  

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {loadProducts} from './actions/productActions';

const store = configureStore();
store.dispatch(loadProducts());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);