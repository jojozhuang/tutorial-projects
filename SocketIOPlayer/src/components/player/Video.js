import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';
import RangeSlider from '../controls/RangeSlider';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
    };
  }

  render() {
    return (
      <div className="container">
        <h2>Video</h2>
        <RangeSlider />
      </div>
    );
  }
}

export default Video;