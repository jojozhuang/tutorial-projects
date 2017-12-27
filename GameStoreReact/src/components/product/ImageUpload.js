import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, ControlLabel, FormControl, Button, Image, Label} from 'react-bootstrap';
import fileApi from '../../api/FileApi';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      filename: this.props.filename,
      file: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  render() {
    console.log('ImageUpload.render');
    return(
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>Image:</Col>
        <Col sm={10}><Image src={this.props.image} thumbnail width="80" height="80" />&nbsp;
        <ControlLabel className="btn btn-success" htmlFor="fileSelector">
          <FormControl id="fileSelector" type="file" style={{display: 'none'}} onChange={this.handleFileChange}/>Choose Image
        </ControlLabel>&nbsp;
        <Label bsStyle="info">{this.state.filename}</Label>&nbsp;
        <Button bsStyle="primary" type="button" onClick={this.handleFileUpload}>Upload</Button>
        </Col>
      </FormGroup>
    );
  }


  handleFileChange(event) {
    const filename = event.target.files[0].name;
    this.setState({filename: filename});
    this.setState({file: event.target.files[0]});
  }

  handleFileUpload(event) {
    fileApi.uploadFile(this.state.file).then(response => {
      this.props.onImageChange(response.message);
    }).catch(error => {
      this.props.onError(error);
    });
  }
}


ImageUpload.propTypes = {
  //image: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default ImageUpload;
