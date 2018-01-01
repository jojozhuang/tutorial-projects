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

  drawScreenShot(ssdata) {
    //console.log('Screenshot.drawScreenShot');
    const cellWidth = this.refs.myss.width / 8;
    const cellHeight = this.refs.myss.height / 8;
    let left, top, width, height = 0;
    const ctxss = this.refs.myss.getContext('2d');
    const ctxworkingss = this.refs.workingss.getContext('2d');
    let imageList = JSON.parse(ssdata.ssdata);
    for (let i = 0; i < imageList.length; i++) {
      left = cellWidth * imageList[i].col;
      top = cellHeight * imageList[i].row;
      width = cellWidth;
      height = cellHeight;
      // use hidden canvas to avoid refreshing
      this.drawImageOnCanvas(ctxworkingss, left, top, width, height, imageList[i].image);
    }
    ctxss.drawImage(this.refs.workingss, 0, 0);
  }

  drawImageOnCanvas(ctx, left, top, width, height, image) {
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, left, top, width, height);
    };
    img.src = image;
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
        <h4 style={{textAlign: 'left'}}>Screenshot</h4>
        <canvas ref="myss" width="500" height="300" style={{border:'1px solid #000000'}} />
        <canvas ref="workingss" width="500" height="300" style={{display:'none'}} />
      </div>
    );
  }
}

export default Screenshot;