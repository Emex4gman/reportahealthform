import React from "react";
import PropTypes from "prop-types";

const RadioButtonInput = ({ type = "radio", name, value, onChange }) => (
  <input type={type} name={name} value={value} onChange={onChange} />
);

RadioButtonInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default RadioButtonInput;
