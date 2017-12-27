import React from 'react';
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap';

const AlertSimple = ({error}) => {
  console.log(error)
  return (
    <Alert bsStyle="warning">
      {error.toString()}
    </Alert>
  );
};

AlertSimple.propTypes = {
  //error: PropTypes.object.isRequired
};

/*
export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data{
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}*/

export default AlertSimple;
