import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
    };
  }

  render() {
    return (
      <div>
        <h2>Whiteboard</h2>
        <canvas width="500" height="300" style={{border:'1px solid #000000'}}></canvas>
      </div>
    );
  }
}

export default Whiteboard;