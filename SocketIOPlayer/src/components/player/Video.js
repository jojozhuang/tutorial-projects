import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Grid, Row} from 'react-bootstrap';
import RangeSlider from '../controls/RangeSlider';
import Clock from '../controls/Clock';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {}
    };
  }

  render() {
    return (
      <RangeSlider min={0} max={4 * 60 * 60 - 30 * 60} value={0} onTimeChange={this.props.onTimeChange} onStart={this.props.onStart} onStop={this.props.onStop}/>
    );
  }
}

Video.propTypes = {
  onTimeChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Video;