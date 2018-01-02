import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

const io = require('socket.io-client');
const socket = io();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    socket.on('realtime', (time) => this.setTime(time));
  }

  setTime(time) {
    this.setState({time: time});
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <h1>Course Player</h1>
          <p>Built with <a href='https://reactjs.org/'>React</a> and <a href='https://socket.io/'>Socket.IO</a></p>
          <p>Current server time is: <span id="time">{this.state.time}</span></p>
        </div>
        <hr/>
      </div>
    );
  }
}

export default Header;