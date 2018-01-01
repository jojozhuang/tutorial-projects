import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';

let lastPoint;

class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      value: 0
    };
  }

  drawWhiteboard(wbdata) {
    //console.log('Whiteboard.drawWhiteboard');
    let currentColor = -10;
    let currentWidth = 1;
    const ctxwb = this.refs.mywb.getContext('2d');
    const ctxworkingwb = this.refs.workingwb.getContext('2d');
    let xRate = this.refs.workingwb.width / 9600;
    let yRate = this.refs.workingwb.height / 4800;
    ctxworkingwb.fillStyle = "solid";
    let data = wbdata.wbdata;
    if (data) {
      let wbobj = JSON.parse(data);
      if (wbobj.wblines) {
        for (let i = 0; i < wbobj.wblines.length; i++) {
          let line = wbobj.wblines[i];
          this.drawline(ctxworkingwb, this.getColor(line.color), this.getWidth(line.color), line.x0, line.y0,line.x1, line.y1, xRate, yRate);
        }
        ctxwb.drawImage(this.refs.workingwb, 0, 0);
      }
      if (wbobj.wbevents) {
        let endMilliseconds = wbobj.second * 1000 % 60000;
        for (let i = 0; i < endMilliseconds; i++) {
          for (let j = 0; j < wbobj.wbevents.length; j++) {
            let event = wbobj.wbevents[j];
            if (event&&event.timestamp == i) {
              if (event.x >=0) {
                if (!lastPoint) {
                  lastPoint = event;
                } else {
                  this.drawline(ctxworkingwb, this.getColor(currentColor), currentWidth, lastPoint.x, lastPoint.y,event.x, event.y, xRate, yRate);
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
            }
          }
        }
        ctxwb.drawImage(this.refs.workingwb, 0, 0);
      }
    }
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
    const ctxwb = this.refs.mywb.getContext('2d');
    const ctxworkingwb = this.refs.workingwb.getContext('2d');
    ctxwb.clearRect(0, 0, this.refs.mywb.width, this.refs.mywb.height);
    ctxworkingwb.clearRect(0, 0, this.refs.workingwb.width, this.refs.workingwb.height);
  }
  render() {
    return (
      <div>
        <h4 style={{textAlign: 'right'}}>Whiteboard</h4>
        <canvas ref="mywb" width="500" height="300" style={{border:'1px solid #000000'}} />
        <canvas ref="workingwb" width="500" height="300" style={{display:'none'}} />
      </div>
    );
  }
}

export default Whiteboard;