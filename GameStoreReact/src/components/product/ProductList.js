import React from 'react';  
import PropTypes from 'prop-types'
import { Button, ButtonToolbar} from 'react-bootstrap';
import productApi from '../../api/ProductsApi';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

    //this.deleteRow = this.deleteRow.bind(this);
    //onChange={this.deleteRow}
  }
  
  componentDidMount() {
    return productApi.getAllProducts().then(products => {
      this.setState({products: products});
    }).catch(error => {
      throw(error);
    });
  }

  render() {
    console.log('render')
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
      let oldProduct = this.state.products.find(product => product.id == id)
      return productApi.deleteProduct(oldProduct).then(() => {
        console.log(`Deleted ${oldProduct.id}`)
        const products = Object.assign([], this.state.products);
        const indexToDelete = this.state.products.findIndex(product => {return product.id == oldProduct.id})
        products.splice(indexToDelete, 1);
        this.setState({products: products});
      }).catch(error => {
        throw(error);
      })
    }
  }
}

/*
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};*/

export default ProductList