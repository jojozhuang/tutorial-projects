import React from 'react';  
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, FieldGroup, Button, Image, Label} from 'react-bootstrap';
import HtmlInput from '../controls/HtmlInput';
import HtmlFile from '../controls/HtmlFile';
import {connect} from 'react-redux';  
import * as actions from '../../actions/productActions'

const ProductEdit = ({product, filename}) => {
  return(
    <div className="container">
    <h2  >Create New Product</h2>
    <h2 >Edit Product</h2>
    <form className="form-horizontal" >
    <Form horizontal>
      <HtmlInput name="id" label="Product ID:" value={product.id} onChange={onChange}/>
      <FormGroup controlId="productName">
        <Col componentClass={ControlLabel} sm={2}>Product Name:</Col>
        <Col sm={10}><FormControl type="text" placeholder="Enter product name" /></Col>
      </FormGroup>
      <FormGroup controlId="price">
        <Col componentClass={ControlLabel} sm={2}>Price:</Col>
        <Col sm={10}><FormControl type="text" placeholder="Enter price" /></Col>
      </FormGroup>
      <FormGroup controlId="image">
        <Col componentClass={ControlLabel} sm={2}>Image:</Col>
        <Col sm={10}><Image src={product.image} thumbnail width="80" height="80" />&nbsp;
          <ControlLabel className="btn btn-success" htmlFor="fileSelector">
            <FormControl id="fileSelector" type="file" style={{display: 'none'}} onChange={fileChanged}/>Choose Image
          </ControlLabel>&nbsp;
          <Label bsStyle="info">{filename}</Label>&nbsp;
          <Button bsStyle="primary" type="button" onClick={saveProduct}>Upload</Button>
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button bsStyle="primary" type="submit" onClick={saveProduct}>Save</Button>
        </Col>
      </FormGroup>
    </Form>
    <FormGroup>
      <HtmlInput name="id" label="Product ID:" value={product.id} onChange={onChange}/>
      <HtmlInput name="productName" label="Product Name:" placeholder="Enter product name" value={product.productName} onChange={onChange}/>
      <HtmlInput name="price" label="Price:" placeholder="Enter price" value={product.price} onChange={onChange}/>
      <div className="form-group">
        <label className="control-label col-sm-2" htmlFor="image">Image:</label>
        <div className="col-sm-10">
            <input type="hidden" name="image" />
            <img src={product.image} className="img-thumbnail" width="80" height="80" />
            
            <HtmlFile name="fileSelector" filetext="Choose Image" buttontext="Upload" onChange={onChange}/>
            <label className="btn btn-success" htmlFor="fileSelector">
                <input id="fileSelector" type="file" style={{display: 'none'}} />
                Choose Image
            </label>
            <span className='label label-info'></span>
            <span><button type="button" className="btn btn-primary" >Upload</button></span>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <input type="submit" className="btn btn-primary" value="Save" onClick={saveProduct}/>
        </div>
      </div>
      </FormGroup>
    </form>
  </div>
  );
};

ProductEdit.propTypes = {
  product: PropTypes.object.isRequired,
  filename: PropTypes.string.isRequired
  //onChange: PropTypes.func.isRequired,
};

function fileChanged(event) {
  console.log(event.target.files[0].name);
  const filename = event.target.files[0].name;
  return this.setState({filename: filename});
}

function onChange(event) {
  const field = event.target.name;
  const product = this.state.product;
  product[field] = event.target.value;
  return this.setState({product: product});
}

function getProductById(products, id) {
  let product = products.find(product => product.id == id)
  return Object.assign({}, product)
}

function saveProduct(event) {
  event.preventDefault();
  this.setState({saving: true});
  console.log("saveProduct");
  console.log(this.state.product);
  this.props.actions.createProduct(this.state.product);
} 

function mapStateToProps(state, ownProps) {
  const pId = ownProps.match.params.id;
  let product = {id: '', productName: '', price: '', image: ''};
  let filename = "xbox.jpg";
  let file = null;
  product.image = process.env.API_HOST+"/images/default.png";
  //console.log(ownProps);
  if (pId) {
    product = getProductById(state.products, pId);
  }
  return {
    product: product,
    filename: filename,
    file: file
  };
} 

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);  