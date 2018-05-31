import React from 'react';
import PropTypes from 'prop-types';
import AlertSimple from '../controls/AlertSimple';
import ProductForm from './ProductForm';
import productApi from '../../api/ProductsApi';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      product: {
        id: '0',
        productName: '',
        price: '',
        image: `${process.env.API_HOST}/images/default.png`,
      },
      isnew: false,
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const pId = this.props.match.params.id;
    const isnew = pId == null;
    this.setState({ isnew });

    if (pId) {
      productApi
        .getProduct(pId)
        .then((product) => {
          this.setState({ product });
        })
        .catch((error) => {
          this.handleError(error);
        });
    }
  }

  updateProductState(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;
    return this.setState({ product });
  }

  handleImageChange(image) {
    // clear error
    this.setState({ hasError: false });
    this.setState({ error: null });
    // update product to inform child component
    const product = this.state.product;
    product.image = image;
    return this.setState({ product: this.state.product });
  }

  handleSave(event) {
    event.preventDefault();
    const product = this.state.product;
    // console.log(product);
    if (this.state.isnew) {
      productApi
        .createProduct(product)
        .then((response) => {
          this.props.history.push('/products');
        })
        .catch((error) => {
          this.handleError(error);
        });
    } else {
      productApi
        .updateProduct(product)
        .then((response) => {
          this.props.history.push('/products');
        })
        .catch((error) => {
          this.handleError(error);
        });
    }
  }

  handleError(error) {
    // console.log(error);
    this.setState({ error });
    this.setState({ hasError: true });
  }

  render() {
    // console.log('ProductPage.render');
    // console.log(this.state);
    let alert = '';
    if (this.state.hasError) {
      alert = <AlertSimple error={this.state.error} />;
    }
    let pageTitle = 'Edit Product';
    if (this.state.isnew) {
      pageTitle = 'Create New Product';
    }
    return (
      <div className="container">
        <h2>{pageTitle}</h2>
        {alert}
        <ProductForm
          product={this.state.product}
          isnew={this.state.isnew}
          onChange={this.updateProductState}
          onImageChange={this.handleImageChange}
          onSave={this.handleSave}
          onError={this.handleError}
        />
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ProductPage;
