import React from 'react';  
import PropTypes from 'prop-types';
import RangeSlider from '../controls/RangeSlider';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // empty
    };
  }

  render() {
    return (
      <RangeSlider min={0} max={4 * 60 * 60 - 30 * 60} value={0} onTimeChange={this.props.onTimeChange} onStop={this.props.onStop}/>
    );
  }
}

Video.propTypes = {
  onTimeChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default Video;