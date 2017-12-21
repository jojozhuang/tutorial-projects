import React from 'react';
import PropTypes from 'prop-types'
import { Button, ButtonToolbar} from 'react-bootstrap';

const HtmlFile = ({name, filetext, buttontext, onChange, type="file"}) => {
  let labelClass = 'btn btn-success';
  let fileClass = 'label label-info';
  let buttonClass = 'btn btn-primary';
  return (
    <span>
      <label className={labelClass} htmlFor={name}>
          <input name={name} type={type} style={{display: 'none'}} />
          {filetext}
      </label>
      <span className={fileClass}></span>
      <span>{' '}<Button bsStyle="primary">{buttontext}</Button>
      <ButtonToolbar>
        
      </ButtonToolbar>
        <button type="button" className={buttonClass} >{buttontext}</button>
      </span>
    </span>
  );
};

HtmlFile.propTypes = {
  filetext: PropTypes.string.isRequired,
  buttontext: PropTypes.string.isRequired
};

export default HtmlFile;
