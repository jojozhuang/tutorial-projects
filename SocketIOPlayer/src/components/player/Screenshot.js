import React from 'react';  
import PropTypes from 'prop-types';
import Canvas from '../controls/Canvas';

class Screenshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // state
    };
  }

  drawScreenShot(ssdata) {
    //console.log('Screenshot.drawScreenShot');
    const cellWidth = this.myss.width / 8;
    const cellHeight = this.myss.height / 8;
    let left, top, width, height = 0;
    const ctxss = this.myss.getContext('2d');
    const ctxworkingss = this.workingss.getContext('2d');
    let imageList = JSON.parse(ssdata);
    for (let i = 0; i < imageList.length; i++) {
      left = cellWidth * imageList[i].col;
      top = cellHeight * imageList[i].row;
      width = cellWidth;
      height = cellHeight;
      // use hidden canvas to avoid refreshing
      this.drawImageOnCanvas(ctxworkingss, left, top, width, height, imageList[i].image);
    }
    ctxss.drawImage(this.workingss, 0, 0);
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
    const ctxss = this.myss.getContext('2d');
    const ctxworkingss = this.workingss.getContext('2d');
    ctxss.clearRect(0, 0, this.myss.width, this.myss.height);
    ctxworkingss.clearRect(0, 0, this.workingss.width, this.workingss.height);
  }

  render() {
    //console.log('Screenshot.render');
    return (
      <div>
        <Canvas canvasRef={el => this.myss = el} display="block"/>
        <Canvas canvasRef={el => this.workingss = el} display="none"/>
        <h4 style={{textAlign: 'center'}}>Screenshot</h4>
      </div>
    );
  }
}

export default Screenshot;