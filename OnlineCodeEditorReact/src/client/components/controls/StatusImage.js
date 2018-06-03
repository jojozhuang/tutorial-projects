import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

class StatusImage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    if (this.props.hasError) {
      return <Image src="./public/error.png" rounded />;
    } else if (this.props.message !== '') {
      return <Image src="./public/ok.png" rounded />;
    }
    return '';
  }
}

StatusImage.propTypes = {
  hasError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default StatusImage;
