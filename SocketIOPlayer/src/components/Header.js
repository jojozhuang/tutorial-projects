import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

const io = require('socket.io-client');
const socket = io();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "222"
    };
    socket.on('current', (time) => this.setTime(time));
  }

  setTime(time) {
    this.setState({time: time});
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <h1>Course Player</h1>
          <p>Built with React and Socket.IO</p>
          <p>Current server time is: <span id="time">{this.state.time}</span></p>
        </div>
        <hr/>
      </div>
    );
  }
}

export default Header;