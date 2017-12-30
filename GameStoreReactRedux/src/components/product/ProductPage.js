import React from 'react';
import PropTypes from 'prop-types';
import AlertSimple from '../controls/AlertSimple';
import ProductForm from './ProductForm';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productActions from '../../actions/productActions';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      product: {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"},
      isnew: false
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    //console.log('ProductPage.componentWillReceiveProps');
    //console.log(nextProps);
    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({product: nextProps.product});
    this.setState({isnew: nextProps.isnew});
  }

  updateProductState(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }

  handleImageChange(image) {
    const product = this.state.product;
    product['image'] = image;
    return this.setState({product: this.state.product});
  }
  
  handleSave(event) {
    event.preventDefault();
    let product = this.state.product;
    //console.log(product);
    if (this.state.isnew) {
      this.props.productActions.createProduct(product);
    } else {
      this.props.productActions.updateProduct(product);
    }
  }
  
  handleError(error) {
    //console.log(error);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    //console.log('ProductPage.render');
    //console.log(this.state);
    let alert = '';
    if (this.state.hasError) {
      alert = <AlertSimple error={this.state.error}/>;
    }
    let pageTitle = 'Edit Product';
    if (this.state.isnew) {
      pageTitle = 'Create New Product';
    }
    return(
      <div className="container">
        <h2>{pageTitle}</h2>
        {alert}
        <ProductForm 
          product={this.state.product} 
          isnew={this.state.isnew}
          onChange={this.updateProductState}
          onImageChange={this.handleImageChange}
          onSave={this.handleSave}
          onError={this.handleError}/> 
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  product: PropTypes.object.isRequired,
  isnew: PropTypes.bool.isRequired,
  productActions: PropTypes.object.isRequired
};

function getProductById(products, id) {
  let product = products.find(product => product.id == id);
  return Object.assign({}, product);
}

function mapStateToProps(state, ownProps) {
  //console.log('ProductPage.mapStateToProps');
  //console.log(state);
  //console.log(ownProps);

  const pId = ownProps.match.params.id;
  let isnew = pId == null;

  // new product
  let product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  if (pId) { //update product
    // find product from list by id
    product = state.products.find(product => product.id == pId);
  } 

  // error occurs
  let hasError = state.error !== null;
  let error = state.error;

  if (hasError) {
    product = state.error.product; // preserve the state in case user made change to the product
  } else if (product == null) {
    hasError = true;
    error = new Error("No such product: " + pId);
    product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  }

  if (product == null) {
    hasError = false;
    error = null;
    product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  }
  
  // refresh if image is uploaded, product info needs to be preserved
  if (state.file.product) { 
    product = state.file.product;
  } 

  return {
    hasError: hasError,
    error: error,
    product: product,
    isnew: isnew
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);  