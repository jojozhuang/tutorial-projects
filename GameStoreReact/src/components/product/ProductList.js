import React from 'react';  
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';  
import { Button, ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router';
import * as actions from '../../actions/productActions'

const ProductList = ({products}) => {
  return (
    <div className="container">
        <h2>Products</h2>
        <p>Data from Restful API</p>

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
              products.map(product => 
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td><img src={product.image} className="img-thumbnail" width="80" height="80"/></td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="success" href={'/productedit/' + product.id} onClick={someCallback}>Edit</Button>
                    <Button bsStyle="danger" onClick={(e) => deleteRow(product.id, e)}>Delete</Button>
                   </ButtonToolbar>
                   <a className="btn btn-success" >Edit</a>&nbsp;<a className="btn btn-danger" >Delete</a></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  );
};

function deleteRow (id, e) {
  if(window.confirm('Are you sure to delete this product?')){
    //console.log(event.id);
    console.log('this is:', id);
    this.props.actions.deleteProduct(this.state.product)
  }
}

function someCallback() {

};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
} 

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);