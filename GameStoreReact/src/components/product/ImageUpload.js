import React from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, Button, Image, Label} from 'react-bootstrap';
import fileApi from '../../api/FileApi';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      file: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({filename: file.name});
    this.setState({file: file});
  }

  handleFileUpload(event) {
    fileApi.uploadFile(this.state.file).then(response => {
      this.props.onImageChange(response.message);
    }).catch(error => {
      this.props.onError(error);
    });
  }

  render() {
    //console.log('ImageUpload.render');
    return(
      <div>
        <Image src={this.props.image} thumbnail width="80" height="80" />&nbsp;
        <ControlLabel className="btn btn-success" htmlFor="fileSelector">
          <FormControl id="fileSelector" type="file" style={{display: 'none'}} onChange={this.handleFileChange}/>Choose Image
        </ControlLabel>&nbsp;
        <Label bsStyle="info">{this.state.filename}</Label>&nbsp;
        <Button bsStyle="primary" type="button" onClick={this.handleFileUpload}>Upload</Button>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  image: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default ImageUpload;
