import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';
import styled from 'styled-components';

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
      hasError: false,
      error: {},
      value: 20
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <Div>
        <Input type="range" min="1" max="100" value={this.state.value} onChange={this.handleChange}/>
        <p>Value: {this.state.value}</p>
      </Div>
    );
  }
}

export default RangeSlider;