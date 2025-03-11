import React from 'react';
import PropTypes from 'prop-types';

const Textbox = ({ label, name, value, onChange, type , required = false,disabled = false }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
      required={required}
      disabled ={disabled} 
    />
  </div>
);

Textbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Textbox;
