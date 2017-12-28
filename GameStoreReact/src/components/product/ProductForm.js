import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';
import ImageUpload from './ImageUpload';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('ProductForm.render');
    let productIdControl = null;
    if (this.props.isnew) {
      productIdControl = '';
    } else {
      productIdControl = (
        <FormGroup controlId="id">
          <Col componentClass={ControlLabel} sm={2}>Product ID:</Col>
          <Col sm={10}><FormControl name="id" type="text" value={this.props.product.id +""} disabled onChange={this.props.onChange}/></Col>
        </FormGroup>
      );
    }
    return(
      <Form horizontal>
        {productIdControl}
        <FormGroup controlId="productName">
          <Col componentClass={ControlLabel} sm={2}>Product Name:</Col>
          <Col sm={10}><FormControl name="productName" type="text" placeholder="Enter product name" value={this.props.product.productName +""} onChange={this.props.onChange}/></Col>
        </FormGroup>
        <FormGroup controlId="price">
          <Col componentClass={ControlLabel} sm={2}>Price:</Col>
          <Col sm={10}><FormControl name="price" type="text" placeholder="Enter price" value={this.props.product.price +""} onChange={this.props.onChange}/></Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Image:</Col>
          <Col sm={10}><ImageUpload image={this.props.product.image} onImageChange={this.props.onImageChange} onError={this.props.onError} /></Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="button" onClick={this.props.onSave}>Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  isnew: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default ProductForm;
