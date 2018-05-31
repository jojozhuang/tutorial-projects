import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AlertSimple from '../controls/AlertSimple';
import productApi from '../../api/ProductsApi';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      products: [],
    };

    this.deleteRow = this.deleteRow.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    return productApi
      .getAllProducts()
      .then((products) => {
        this.setState({ products });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  deleteRow(event, id) {
    if (window.confirm('Are you sure to delete this product?')) {
      const oldProduct = this.state.products.find(product => product.id === id);
      return productApi
        .deleteProduct(oldProduct)
        .then(() => {
          const products = Object.assign([], this.state.products);
          const indexToDelete = this.state.products.findIndex(product => product.id === oldProduct.id, );
          products.splice(indexToDelete, 1);
          this.setState({ products });
        })
        .catch((error) => {
          this.handleError(error);
        });
    }
    return '';
  }

  handleError(error) {
    this.setState({ hasError: true });
    this.setState({ error });
  }

  render() {
    // console.log('ProductList.render')
    let alert = '';
    if (this.state.hasError) {
      alert = <AlertSimple error={this.state.error} />;
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
            {this.state.products.sort((a, b) => a.id < b.id).map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={product.image}
                    className="img-thumbnail"
                    width="80"
                    height="80"
                    alt=""
                  />
                </td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="success" href={`/productpage/${product.id}`}>
                      Edit
                    </Button>
                    <Button bsStyle="danger" onClick={e => this.deleteRow(e, product.id)}>
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
