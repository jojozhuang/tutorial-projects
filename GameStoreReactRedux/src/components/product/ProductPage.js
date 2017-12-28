import React from 'react';  
import PropTypes from 'prop-types';
import AlertSimple from '../controls/AlertSimple';
import ProductForm from './ProductForm';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productactions from '../../actions/productActions'
import * as fileactions from '../../actions/fileActions'

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      product: {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"},
      isnew: false,
      isSaving: false
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  componentWillMount() {
    console.log('componentWillMount');
    console.log(this.state.isSaving)
    /*if (this.state.isSaving) {
      this.props.history.push('/products')
    }*/
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(this.state);

    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({product: nextProps.product});
    this.setState({isnew: nextProps.isnew});
    this.setState({isSaving: nextProps.isSaving});
    console.log(this.state);
    //console.log(this.state.isSaving);
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
    this.setState({isSaving: true});
    event.preventDefault();
    let product = this.state.product;
    //console.log(product);
    if (this.state.isnew) {
      this.props.productactions.createProduct(product);  
    } else {
      this.props.productactions.updateProduct(product);  
    }
  }
  
  handleError(error) {
    //console.log(error);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    console.log('ProductPage.render');
    console.log(this.state);
    if (this.state.isSaving) {
      this.props.history.push('/products')
    }
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
  history: PropTypes.object.isRequired
};

function getProductById(products, id) {
  let product = products.find(product => product.id == id)
  return Object.assign({}, product)
}

function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps');
  console.log(state);
  console.log(ownProps);
  if (state.file.response) {
    console.log(state.file.response.message);
  }
  console.log(ownProps);
  const pId = ownProps.match.params.id;
  let product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  let isnew = pId == null;
  
  if (pId) {
    product = getProductById(state.products, pId);
  } else {
    
  }

  return {
    hasError: false,
    error: {},
    product: product,
    isnew: isnew,
    isSaving: false
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    productactions: bindActionCreators(productactions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);  