import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';
import Canvas from '../controls/Canvas';

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasIsDrawing: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {    
    //console.log(this.state);
    //console.log(nextState);
    return this.state.canvasIsDrawing != nextState.canvasIsDrawing;
  }

  drawWhiteboard(wbdata) {
    //console.log('Whiteboard.drawWhiteboard');
    this.setState({'canvasIsDrawing': true});
    let lastPoint; //use state to preserve the value
    let currentColor = -10;
    let currentWidth = 1;
    const ctxwb = this.mywb.getContext('2d');
    const ctxworkingwb = this.workingwb.getContext('2d');
    let xRate = this.workingwb.width / 9600;
    let yRate = this.workingwb.height / 4800;
    ctxworkingwb.fillStyle = "solid";
    let wbobj = JSON.parse(wbdata);
    if (wbobj.wblines) {
      for (let i = 0; i < wbobj.wblines.length; i++) {
        let line = wbobj.wblines[i];
        this.drawline(ctxworkingwb, this.getColor(line.color), this.getWidth(line.color), line.x0, line.y0,line.x1, line.y1, xRate, yRate);
      }
      ctxwb.drawImage(this.workingwb, 0, 0);
    }
    if (wbobj.wbevents) {
      //lastPoint = this.state.lastPoint;
      //console.log(lastPoint)
      let endMilliseconds = wbobj.second * 1000 % 60000;
      for (let i = 0; i < endMilliseconds; i++) {
        for (let j = 0; j < wbobj.wbevents.length; j++) {
          let event = wbobj.wbevents[j];
          if (event&&event.timestamp == i) {
            if (event.x >=0) {
              if (!lastPoint) {
                lastPoint = event;
              } else {
                //console.log(lastPoint);
                this.drawline(ctxworkingwb, this.getColor(currentColor), currentWidth, lastPoint.x, lastPoint.y, event.x, event.y, xRate, yRate);
                lastPoint = event;
              }
            } else {
              switch (event.x) {
                 case -100: //Pen Up
                   currentColor = -8;
                   lastPoint = null;
                   break;
                 case -200: //Clear event
                    this.clearWhiteboard();
                    lastPoint = null;
                    break;
                 default:
                    currentColor = event.x;
                    currentWidth = this.getWidth(currentColor);
                    break;
               }
               lastPoint = null;
            }
            //this.setState({lastPoint, lastPoint});
          }
        }
      }
      ctxwb.drawImage(this.workingwb, 0, 0);
    }
    //this.setState({'canvasIsDrawing': false});
  }

  drawline(workingwb, color, width, x0, y0, x1, y1, xRate, yRate) {
    workingwb.beginPath();
    workingwb.strokeStyle = color;
    workingwb.lineWidth = width;
    workingwb.moveTo(x0 * xRate, y0 * yRate);
    workingwb.lineTo(x1 * xRate, y1 * yRate);
    workingwb.closePath();
    workingwb.stroke();
  }
  getColor(color) {
    switch (color) {
      case -1:
          return '#FF0000';
      case -2:
          return '#0000FF';
      case -3:
          return '#00FF00';
      case -8:
          return '#000000';
      case -9:
          return '#FFFFFF';
      case -10:
          return '#FFFFFF';
      default:
          return '#FFFFFF';
    }
  }

  getWidth(color) {
    switch (color) {
      case -1:
          return 1;
      case -2:
          return 1;
      case -3:
          return 1;
      case -8:
          return 1;
      case -9:
          return 8 * 10 / 12;
      case -10:
          return 39 * 10 / 12;
      default:
          return 1;
    }
  }

  clearWhiteboard() {
    // reset whiteboard
    //console.log('clearWhiteboard');
    const ctxwb = this.mywb.getContext('2d');
    const ctxworkingwb = this.workingwb.getContext('2d');
    ctxwb.clearRect(0, 0, this.mywb.width, this.mywb.height);
    ctxworkingwb.clearRect(0, 0, this.workingwb.width, this.workingwb.height);
  }

  render() {
    //console.log('Whiteboard.render');
    return (
      <div>
        <Canvas canvasRef={el => this.mywb = el} display="block"/>
        <Canvas canvasRef={el => this.workingwb = el} display="none"/>
        <h4 style={{textAlign: 'center'}}>Whiteboard</h4>
      </div>
    );
  }
}

export default Whiteboard;