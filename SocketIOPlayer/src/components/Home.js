import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Video from './player/Video';
import Screenshot from './player/Screenshot';
import Whiteboard from './player/Whiteboard';

const playerStyle = {
  backgroundColor: '#ffe3ad',
  border: 'thick solid #808080'
};

const videoStyle = {
  marginTop: '10px'
};

const io = require('socket.io-client');
const socket = io();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };

    socket.on('playCourse', (data) => this.playCourse(data));
    
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePlayerStop = this.handlePlayerStop.bind(this);
  }
  
  playCourse(data) {
    //console.log('playCourse');
    this.refs.ss.drawScreenShot(data.ssdata);
    this.refs.wb.drawWhiteboard(data.wbdata);
  }

  handlePlayerStop() {
    this.refs.ss.clearScreenshot();
    this.refs.wb.clearWhiteboard();
  }

  handleTimeChange(time, clear) {
    this.setState({ time: time });
    if (clear) {
      this.refs.wb.clearWhiteboard();
    }
    socket.emit('updateTime', { time: time });
  }

  render() {
    return(
      <Grid style={playerStyle}>
        <Row className="show-grid" style={videoStyle}>
          <Col><Video ref="video" onTimeChange={this.handleTimeChange} onStop={this.handlePlayerStop}/></Col>
        </Row>
        <Row className="show-grid">
          <Col sm={6} style={{textAlign: 'left'}}><Screenshot ref="ss" /></Col>
          <Col sm={6} style={{textAlign: 'right'}}><Whiteboard ref="wb" /></Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;