import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Video from './player/Video';
import Screenshot from './player/Screenshot';
import Whiteboard from './player/Whiteboard';

const io = require('socket.io-client');
const socket = io();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };

    socket.on('drawScreenshot', (imagedata) => this.drawScreenshot(imagedata));
    socket.on('drawWhiteboard', (wbdata) => this.drawWhiteboard(wbdata));

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePlayerStop = this.handlePlayerStop.bind(this);
  }
  
  drawScreenshot(imagedata) {
    this.refs.ss.drawScreenShot(imagedata);
  }

  drawWhiteboard(wbdata) {
    this.refs.wb.drawWhiteboard(wbdata);
  }

  handlePlayerStop() {
    //console.log('handlePlayerStop');
    this.refs.ss.clearScreenshot();
    this.refs.wb.clearWhiteboard();
  }

  handleTimeChange(time, clear) {
    this.setState({ time: time });
    //console.log('home.handleTimeChange');
    console.log(time);
    if (clear) {
      this.refs.wb.clearWhiteboard();
    }
    socket.emit('updateTime', { time: time });
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-12"><Video onTimeChange={this.handleTimeChange} onStop={this.handlePlayerStop}/></div>
          <p>Home Value: {this.state.time}</p>
        </div>
        <div className="row">
          <div className="col-sm-6"><Screenshot ref="ss" time={this.state.time}/></div>
          <div className="col-sm-6"><Whiteboard ref="wb" /></div>
        </div>
      </div>
    );
  }
}

export default Home;