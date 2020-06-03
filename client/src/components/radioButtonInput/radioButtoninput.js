import React from "react";
import PropTypes from "prop-types";

const RadioButtonInput = ({
  type = "radio",
  name,
  value,
  onChange,
  ischecked = false,
}) => (
  <input
    defaultChecked={ischecked}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
  />
);

RadioButtonInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  ischecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default RadioButtonInput;
