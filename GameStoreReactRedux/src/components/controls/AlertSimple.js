import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertSimple = ({error}) => {
  return (
    <Alert bsStyle="warning">
      {error.toString()}
    </Alert>
  );
};

AlertSimple.propTypes = {
  error: PropTypes.object.isRequired
};

export default AlertSimple;
