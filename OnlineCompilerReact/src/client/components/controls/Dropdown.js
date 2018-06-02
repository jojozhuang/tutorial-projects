import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

// const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title, i) {
  return (
    <ButtonToolbar>
      <DropdownButton
        bsStyle={title.toLowerCase()}
        title={title}
        key={i}
        id={`dropdown-basic-${i}`}
      >
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>
          Active Item
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
      </DropdownButton>
    </ButtonToolbar>
  );
}

const Dropdown = ({ title }) => renderDropdownButton(title, '99');

// const buttonsInstance = <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>;

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Dropdown;
