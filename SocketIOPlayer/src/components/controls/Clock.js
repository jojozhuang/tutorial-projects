import React, { Component } from 'react';

class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentCount: 0
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  timer() {
    this.setState({currentCount: this.state.currentCount + 1});
    if(this.state.currentCount > 10) { 
      clearInterval(this.intervalId);
      this.setState({currentCount: 0});
    }
  }

  render() {
    return(
      <div>{this.state.currentCount}</div>
    );
  }
}

export default Clock;