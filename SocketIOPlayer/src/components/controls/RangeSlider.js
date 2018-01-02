import React from 'react';  
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import dateTimeApi from '../../api/DateTimeApi';

const Div = styled.div`
  width: 100%;
`;

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
`;

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Play',
      bsStyle: 'primary',
      value: 0
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
    this.setTimeState(0, false);
  }

  timer() {
    //console.log('timer');
    //console.log(this.state.value);
    if(this.state.value >= this.props.max) { 
      clearInterval(this.intervalId);
      this.setTimeState(0, false);
      this.setState({buttonText: 'Play'});
      this.setState({bsStyle: 'primary'});
      this.props.onStop();
      return;
    }

    this.setTimeState(parseInt(this.state.value) + 1, false);
  }

  handlePlay(event) {
    if (this.state.buttonText == 'Play') {
      this.setState({buttonText: 'Stop'});
      this.setState({bsStyle: 'danger'});
      this.intervalId = setInterval(this.timer.bind(this), 1000);
    } else {
      this.setState({buttonText: 'Play'});
      this.setState({bsStyle: 'primary'});
      clearInterval(this.intervalId);
      this.setTimeState(0, false);
      this.props.onStop();
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleMouseUp(event) {
    this.setTimeState(event.target.value, true);
  }

  setTimeState(time, clear) {
    //console.log('setTimeState');
    //console.log(time);
    this.setState({value: time});
    this.props.onTimeChange(time, clear);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}><h5 style={{textAlign: 'left'}}>Current Time: {dateTimeApi.getReadableTimeText(this.state.value)}</h5></Col>
          <Col xs={6} md={4}><p style={{textAlign: 'center'}}><Button bsStyle={this.state.bsStyle} type="button" onClick={this.handlePlay}>{this.state.buttonText}</Button></p></Col>
          <Col xsHidden md={4}><h5 style={{textAlign: 'right'}}>Total Time: {dateTimeApi.getReadableTimeText(12600)}</h5></Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12}><Div>
          <Input type="range" min={this.props.min} max={this.props.max} value={this.state.value} onChange={this.handleChange} onMouseUp={this.handleMouseUp}/>
        </Div></Col>
        </Row>
      </Grid>      
    );
  }
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default RangeSlider;