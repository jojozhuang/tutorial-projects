import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class DropdownLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect(event) {
    this.props.onSelect(event);
  }
  render() {
    return (
      <ButtonToolbar>
        <DropdownButton
          bsStyle={this.props.bsStyle}
          title={this.props.title}
          key={1}
          id="dropdown-basic-1"
        >
          <MenuItem eventKey="1">C</MenuItem>
          <MenuItem eventKey="2">C++</MenuItem>
          <MenuItem eventKey="3" active>
            Java
          </MenuItem>
          <MenuItem eventKey="4">Javascript</MenuItem>
          <MenuItem eventKey="4">Python</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

DropdownLanguage.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DropdownLanguage;
