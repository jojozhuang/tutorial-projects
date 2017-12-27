import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import ProductList from './product/ProductList'
import ProductPage from './product/ProductPage'

const App = () => (
  <div >
    <Header />
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={ProductList}/>
      <Route exact path='/productpage' component={ProductPage}/>
      <Route path='/productpage/:id' component={ProductPage}/>
    </Switch>
    <Footer />
  </div>
)

export default App