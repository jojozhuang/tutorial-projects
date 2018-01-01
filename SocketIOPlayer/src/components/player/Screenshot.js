import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';

class Screenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      time: this.props.time
    };
  }

  drawScreenShot(imagedata) {
    //console.log('Screenshot.drawScreenShot');
    const cellWidth = this.refs.myss.width / 8;
    const cellHeight = this.refs.myss.height / 8;
    let left, top, width, height = 0;
    const ctxss = this.refs.myss.getContext('2d');
    const ctxworkingss = this.refs.workingss.getContext('2d');
    let imageList = JSON.parse(imagedata.imagedata);
    for (let i = 0; i < imageList.length; i++) {
      left = cellWidth * imageList[i].col;
      top = cellHeight * imageList[i].row;
      width = cellWidth;
      height = cellHeight;
      this.loadImageIntoCanvas(ctxworkingss, left, top, width, height, imageList[i].imagestream);
    }
    ctxss.drawImage(this.refs.workingss, 0, 0);
  }

  loadImageIntoCanvas(ctx, left, top, width, height, src) {
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, left, top, width, height);
    };
    img.src = "data:image/png;base64," + src;
  }

  clearScreenshot() {
    // reset screen
    const ctxss = this.refs.myss.getContext('2d');
    const ctxworkingss = this.refs.workingss.getContext('2d');
    ctxss.clearRect(0, 0, this.refs.myss.width, this.refs.myss.height);
    ctxworkingss.clearRect(0, 0, this.refs.workingss.width, this.refs.workingss.height);
  }

  render() {
    return (
      <div>
        <h3>Screenshot</h3>
        <canvas ref="myss" width="500" height="300" style={{border:'1px solid #000000'}} />
        <canvas ref="workingss" width="500" height="300" style={{display:'none'}} />
        <p>Value: {this.props.time}</p>
      </div>
    );
  }
}

export default Screenshot;