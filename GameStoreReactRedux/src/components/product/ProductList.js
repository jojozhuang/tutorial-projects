import React from 'react';  
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';  
import { Button, ButtonToolbar} from 'react-bootstrap';
import * as actions from '../../actions/productActions'

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products
    };

    //this.deleteRow = this.deleteRow.bind(this);
    //onChange={this.deleteRow}
  }
  
  
  componentWillReceiveProps(nextProps) {
    this.setState({products: nextProps.products});
  }

  render() {
    console.log('reader');
    console.log(this.state.products);
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
              this.state.products.map(product => 
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td><img src={product.image} className="img-thumbnail" width="80" height="80"/></td>
                  <td>
                    <ButtonToolbar>
                      <Button bsStyle="success" href={'/productedit/' + product.id} >Edit</Button>
                      <Button bsStyle="danger" onClick={(e) => this.deleteRow(product.id, e)}>Delete</Button>
                    </ButtonToolbar>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
    );
  }

  deleteRow (id, e) {
    if(window.confirm('Are you sure to delete this product?')){
      let product = this.state.products.find(product => product.id == id)
      this.props.actions.deleteProduct(product);
    }
  }
}

/*
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};*/

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    products: state.products
  };
} 

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
//export default ProductList;