import React from 'react';  
import PropTypes from 'prop-types'
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, Image, Label} from 'react-bootstrap';
import AlertSimple from '../controls/AlertSimple';
import productApi from '../../api/ProductsApi';
import fileApi from '../../api/FileApi';

class ProductEdit extends React.Component {
//const ProductEdit = ({product, filename}) => {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      hasError: false,
      error: {},
      id: this.props.id,
      productName: this.props.productName,
      price: this.props.price,
      image: this.props.image,
      isnew: this.props.isnew,
      filename: this.props.filename,
      file: null
    };
    console.log("this.state")
    console.log(this.state);
  }
  
  componentDidMount() {
    const pId = this.props.match.params.id;
    let isnew = pId == null;
    let product = {id: '0', productName: '', price: '', image: ''};
    let filename = "xbox.jpg";
    let file = null;
    product.image = process.env.API_HOST+"/images/default.png";

    this.setState({id: product.id});
    this.setState({productName: product.productName});
    this.setState({price: product.price});
    this.setState({image: product.image});
    this.setState({isnew: isnew});

    if (pId) {
      productApi.getProduct(pId).then(response => {
        product = response
        console.log(product);
        this.setState({id: product.id});
        this.setState({productName: product.productName});
        this.setState({price: product.price});
        this.setState({image: product.image});
        this.setState({isnew: isnew});
      }).catch(error => {
        this.handleError(error);
      });
    }
  }

  render() {
    console.log('render');
    let alert = null;
    if (this.state.hasError) {
      console.log(this.state.error)
      alert = <AlertSimple error={this.state.error}/>;
    } else {
      alert = '';
    }
    let productIdControl = null;
    let pageTitle = '';
    if (this.state.isnew) {
      pageTitle = 'Create New Product';
      productIdControl = '';
    } else {
      pageTitle = 'Edit Product';
      productIdControl = 
      <FormGroup controlId="id">
      <Col componentClass={ControlLabel} sm={2}>Product ID:</Col>
      <Col sm={10}><FormControl type="text" value={this.state.id +""} disabled onChange={(e) => this.handleIdChange(e)}/></Col>
      </FormGroup>;
    }
    return(
      <div className="container">
      <h2>{pageTitle}</h2>
      {alert}
      <Form horizontal>
        {productIdControl}
        <FormGroup controlId="productName">
          <Col componentClass={ControlLabel} sm={2}>Product Name:</Col>
          <Col sm={10}><FormControl type="text" placeholder="Enter product name" value={this.state.productName +""} onChange={(e) => this.handleNameChange(e)}/></Col>
        </FormGroup>
        <FormGroup controlId="price">
          <Col componentClass={ControlLabel} sm={2}>Price:</Col>
          <Col sm={10}><FormControl type="text" placeholder="Enter price" value={this.state.price +""} onChange={(e) => this.handlePriceChange(e)}/></Col>
        </FormGroup>
        <FormGroup controlId="image">
          <Col componentClass={ControlLabel} sm={2}>Image:</Col>
          <Col sm={10}><Image src={this.state.image} thumbnail width="80" height="80" />&nbsp;
          <ControlLabel className="btn btn-success" htmlFor="fileSelector">
            <FormControl id="fileSelector" type="file" style={{display: 'none'}} onChange={(e) => this.handleFileChange(e)}/>Choose Image
          </ControlLabel>&nbsp;
          <Label bsStyle="info">{this.state.filename}</Label>&nbsp;
          <Button bsStyle="primary" type="button" onClick={(e) => this.uploadFile(e)}>Upload</Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="button" onClick={(e) => this.saveProduct(e)}>Save</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    );
  }

  handleIdChange(event) {
    // empty
  }

  handleNameChange(event) {
    this.setState({productName: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleFileChange(event) {
    const filename = event.target.files[0].name;
    this.setState({filename: filename});
    this.setState({file: event.target.files[0]});
  }

  handleImageChange(event) {
    this.setState({image: event.target.value});
  }

  uploadFile(event) {
    fileApi.uploadFile(this.state.file).then(response => {
    //fileApi.uploadFile().then(response => {
      this.setState({image: response.message});
    }).catch(error => {
      this.handleError(error);
    });
  }
  
  saveProduct(event) {
    event.preventDefault();
    let product = {id: this.state.id, productName: this.state.productName, price: this.state.price, image: this.state.image};
    console.log(product);
    if (this.state.isnew) {
      productApi.createProduct(product).then(response => {
        this.props.history.push('/products')
      }).catch(error => {
        this.handleError(error);
      });
    } else {
      productApi.updateProduct(product).then(response => {
        this.props.history.push('/products')
      }).catch(error => {
        this.handleError(error);
      });
    }
  }
  
  handleError(error) {
    console.log(error);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }
}

export default ProductEdit