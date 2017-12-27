import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import ProductList from './product/ProductList'
import ProductEdit from './product/ProductEdit'

const App = () => (
  <div >
    <Header />
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={ProductList}/>
      <Route exact path='/productedit' component={ProductEdit}/>
      <Route path='/productedit/:id' component={ProductEdit}/>
    </Switch>
    <Footer />
  </div>
)

export default App