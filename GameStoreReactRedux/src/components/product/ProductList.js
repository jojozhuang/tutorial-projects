import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';
import AlertSimple from '../controls/AlertSimple';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';  
import * as productActions from '../../actions/productActions';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      products: this.props.products
    };

    this.deleteRow = this.deleteRow.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    //console.log('ProductList.componentWillReceiveProps');
    //console.log(nextProps);
    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({products: nextProps.products});
  }

  deleteRow (event, id) {
    if(window.confirm('Are you sure to delete this product?')){
      let oldProduct = this.state.products.find(product => product.id == id);
      this.props.productActions.deleteProduct(oldProduct, this.state.products);
    }
  }

  handleError(error) {
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    //console.log('ProductList.render')
    let alert = '';
    if (this.state.hasError) {
      alert = (<AlertSimple error={this.state.error}/>);
    }
    return (
      <div className="container">
        <h2>Products</h2>
        <p>Data from Restful API</p>
        {alert}
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.products
              .sort((a, b) => a.id < b.id)
              .map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td><img src={product.image} className="img-thumbnail" width="80" height="80"/></td>
                  <td>
                    <ButtonToolbar>
                      <Button bsStyle="success" href={'/productpage/' + product.id} >Edit</Button>
                      <Button bsStyle="danger" onClick={(e) => this.deleteRow(e, product.id)}>Delete</Button>
                    </ButtonToolbar>
                  </td>
                </tr>)
              )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

ProductList.propTypes = {
  history: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  products: PropTypes.array.isRequired,
  productActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  //console.log('ProductList.mapStateToProps');
  //console.log(state);

  let products = state.products;

  // error occurs
  let hasError = state.error !== null;
  if (hasError) {
    products = state.error.products; // empty list, '[]'
  }
  return {
    hasError: hasError,
    error: state.error,
    products: products
  };
} 

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);