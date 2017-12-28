import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar} from 'react-bootstrap';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div>
    <div className="container">
      <h2>React Tutorial - Product Management</h2>
      <ButtonToolbar>
        <Button bsStyle="info" href="/">Home</Button>
        <Button bsStyle="info" href="/products">List</Button>
        <Button bsStyle="info" href="/productpage">Add</Button>
      </ButtonToolbar>
    </div>
    <hr/>
  </div>
);

export default Header;