import React from 'react';  
import { Route, IndexRoute } from 'react-router';  
import App from './components/App';  
import HomePage from './components/home/HomePage';  
import ListPage from './components/product/ListPage';  
import EditPage from './components/product/EditPage';

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/products" component={ListPage} >
      <Route path="/products/new" component={EditPage} />
      <Route path="/products/:id" component={EditPage} />
    </Route>
  </Route>
);