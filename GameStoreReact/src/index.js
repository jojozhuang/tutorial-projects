import React from 'react';  
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';  
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {loadProducts} from './actions/productActions';

const store = configureStore();
store.dispatch(loadProducts());

render(
  <Provider store={store}>


  </Provider>,
          <BrowserRouter>
          <App />
        </BrowserRouter>
  , document.getElementById('root')
);