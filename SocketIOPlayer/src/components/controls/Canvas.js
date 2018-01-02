import React, { Component } from 'react';
import PropTypes from 'prop-types';

let canvasStyle = {
  background: '#fffbf4',
  margin: '20px auto',
  border: '5px solid #E8E8E8',
  width: 500,
  height: 300,
};

class Canvas extends Component {
  render() {
    return(
      <div>
        <canvas ref={this.props.canvasRef} width="500" height="300" style={Object.assign({},canvasStyle,{display:this.props.display})}/>
       </div>
    );
  }
}

Canvas.propTypes = {
  canvasRef: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired
};

export default Canvas;